import { randomUUIDv7 } from "bun";
import type { OutgoingMessage, SignupOutgoingMessage, ValidateOutgoingMessage } from "common/types";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";
import WebSocket from "ws";

const CALLBACKS: {[callbackId: string]: (data: SignupOutgoingMessage) => void} = {}

let validatorId: string | null = null;
let ws: WebSocket | null = null;

async function main() {
    try {
        const keypair = Keypair.fromSecretKey(
            Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY!))
        );
        
        console.log("Connecting to hub server...");
        ws = new WebSocket("ws://localhost:4001");

        ws.onmessage = async (event) => {
            try {
                const data: OutgoingMessage = JSON.parse(event.data.toString());
                console.log(`Received message type: ${data.type}`);
                
                if (data.type === 'signup') {
                    const callback = CALLBACKS[data.data.callbackId];
                    if (callback) {
                        callback(data.data);
                        delete CALLBACKS[data.data.callbackId];
                        console.log(`Successfully registered with validator ID: ${data.data.validatorId}`);
                    } else {
                        console.warn(`No callback found for signup callbackId: ${data.data.callbackId}`);
                    }
                } else if (data.type === 'validate') {
                    console.log(`Received validate request for: ${data.data.url}`);
                    await validateHandler(ws!, data.data, keypair);
                } else {
                    console.warn(`Received unknown message type: ${data.type}`);
                }
            } catch (error) {
                console.error("Error handling message:", error);
            }
        };

        ws.onopen = async () => {
            console.log("Connection established, sending signup request");
            const callbackId = randomUUIDv7();
            
            CALLBACKS[callbackId] = (data: SignupOutgoingMessage) => {
                validatorId = data.validatorId;
                console.log(`Validator registered with ID: ${validatorId}`);
            };
            
            // Fix: Match the exact format expected by the hub
            const message = `Sign message for ${callbackId},${keypair.publicKey}`;
            console.log(`Signing message: "${message}"`);
            const signedMessage = await signMessage(message, keypair);

            console.log("Sending signup request...");
            ws!.send(JSON.stringify({
                type: 'signup',
                data: {
                    callbackId,
                    ip: '127.0.0.1',
                    publicKey: keypair.publicKey.toString(),
                    signedMessage,
                },
            }));
        };
        
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        
        ws.onclose = () => {
            console.log("Connection closed, attempting to reconnect in 5 seconds...");
            ws = null;
            setTimeout(() => main(), 5000);
        };
    } catch (error) {
        console.error("Error in main function:", error);
        setTimeout(() => main(), 5000);
    }
}

async function validateHandler(ws: WebSocket, { url, callbackId, websiteId }: ValidateOutgoingMessage, keypair: Keypair) {
    console.log(`Validating ${url}`);
    const startTime = Date.now();
    
    // Fix: Use the correct message format
    const signature = await signMessage(`Reply ${callbackId}`, keypair);

    try {
        console.log(`Sending request to ${url}`);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(url, { 
            signal: controller.signal 
        });
        clearTimeout(timeout);
        
        const endTime = Date.now();
        const latency = endTime - startTime;
        const status = response.status;

        console.log(`${url} - Status: ${status}, Latency: ${latency}ms`);
        
        if (!validatorId) {
            console.error("Cannot send validation result: validatorId is not set");
            return;
        }
        
        ws.send(JSON.stringify({
            type: 'validate',
            data: {
                callbackId,
                status: status >= 200 && status < 300 ? 'UP' : 'DOWN',
                latency,
                websiteId,
                validatorId,
                signedMessage: signature,
            },
        }));
    } catch (error) {
        console.error(`Error checking ${url}:`, error);
        
        if (!validatorId) {
            console.error("Cannot send validation result: validatorId is not set");
            return;
        }
        
        ws.send(JSON.stringify({
            type: 'validate',
            data: {
                callbackId,
                status: 'DOWN',
                latency: 1000,
                websiteId,
                validatorId,
                signedMessage: signature,
            },
        }));
    }
}

async function signMessage(message: string, keypair: Keypair) {
    try {
        console.log(`Signing message: "${message}"`);
        const messageBytes = nacl_util.decodeUTF8(message);
        const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
        const signatureString = JSON.stringify(Array.from(signature));
        console.log(`Generated signature of length: ${signature.length}`);
        return signatureString;
    } catch (error) {
        console.error("Error signing message:", error);
        throw error;
    }
}

main();

// Implement heartbeat functionality to keep the connection alive
setInterval(async () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log(`Validator status: Active${validatorId ? ` (ID: ${validatorId})` : ''}`);
    } else if (ws) {
        console.log(`Validator status: Connection state - ${ws.readyState}`);
    } else {
        console.log("Validator status: Disconnected, waiting to reconnect");
    }
}, 10000);