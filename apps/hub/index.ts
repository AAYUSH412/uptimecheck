import { $, randomUUIDv7, type ServerWebSocket } from "bun";
import type { IncomingMessage, SignupIncomingMessage } from "common/types";
import { prismaclient } from "db/client";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";

const availableValidator: {
  validatorId: string;
  socket: ServerWebSocket<unknown>;
  publicKey: string;
}[] = [];

const CALLBACKS: { [callbackId: string]: (data: IncomingMessage) => void } = {};
const COST_PER_VALIDATION = 100; // LAMPORT --- 1 LAMPORT = 0.000001 SOL

Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("upgrade fail", { status: 500 });
  },
  port: 4001,
  websocket: {
    async message(ws: ServerWebSocket<unknown>, message: string) {
      try {
        const data = JSON.parse(message) as IncomingMessage;

        if (data.type === "signup") {
          try {
            console.log(
              `Processing signup request from ${data.data.publicKey.substring(0, 10)}...`
            );
            const verify = await verifyMessage(
              `Sign message for ${data.data.callbackId},${data.data.publicKey}`,
              data.data.publicKey,
              data.data.signedMessage
            );

            if (verify) {
              await signupHandler(ws, data.data);
            } else {
              console.error("Signup verification failed");
            }
          } catch (error) {
            console.error("Error handling signup:", error);
          }
        } else if (data.type === "validate") {
          try {
            const callback = CALLBACKS[data.data.callbackId];
            if (callback) {
              await callback(data);
              delete CALLBACKS[data.data.callbackId];
            } else {
              console.error(
                `No callback found for callbackId: ${data.data.callbackId}`
              );
            }
          } catch (error) {
            console.error("Error handling validation result:", error);
          }
        } else {
          console.warn(`Unknown message type: ${(data as any).type}`);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    },
    async close(ws: ServerWebSocket<unknown>) {
      availableValidator.splice(
        availableValidator.findIndex((v) => v.socket === ws),
        1
      );
    },
  },
});

async function signupHandler(
  ws: ServerWebSocket<unknown>,
  { ip, publicKey, signedMessage, callbackId }: SignupIncomingMessage
) {
  const validatordb = await prismaclient.validator.findFirst({
    where: {
      publickey: publicKey,
    },
  });

  if (validatordb) {
    ws.send(
      JSON.stringify({
        type: "signup",
        data: {
          validatorId: validatordb.id,
          callbackId,
        },
      })
    );

    availableValidator.push({
      validatorId: validatordb.id,
      socket: ws,
      publicKey: validatordb.publickey,
    });
    return;
  }

  const validator = await prismaclient.validator.create({
    data: {
      ip,
      publickey: publicKey, // Consistent casing
      location: "unknown",
    },
  });

  ws.send(
    JSON.stringify({
      type: "signup",
      data: {
        validatorId: validator.id,
        callbackId,
      },
    })
  );

  availableValidator.push({
    validatorId: validator.id,
    socket: ws,
    publicKey: validator.publickey, // Consistent casing
  });
}

async function verifyMessage(
  message: string,
  publicKey: string,
  signedMessage: string
) {
  try {
    const messageBytes = naclUtil.decodeUTF8(message);
    const result = nacl.sign.detached.verify(
      messageBytes,
      new Uint8Array(JSON.parse(signedMessage)),
      new PublicKey(publicKey).toBytes()
    );
    return result;
  } catch (error) {
    console.error("Error in message verification:", error);
    return false;
  }
}

setInterval(async () => {
  const websitesToMonitor = await prismaclient.website.findMany({
    where: {
      disabled: false,
    },
  });

  for (const website of websitesToMonitor) {
    availableValidator.forEach((validator) => {
      const callbackId = randomUUIDv7();
      console.log(
        "sending message to validator",
        validator.validatorId,
        website.url
      );
      validator.socket.send(
        JSON.stringify({
          type: "validate",
          data: {
            url: website.url,
            callbackId,
            websiteId: website.id, // Include websiteId
          },
        })
      );

      CALLBACKS[callbackId] = async (data: IncomingMessage) => {
        if (data.type === "validate") {
          const { validatorId, signedMessage, status, latency } = data.data;
          const verify = await verifyMessage(
            `Reply ${callbackId}`,
            validator.publicKey,
            signedMessage
          );
          if (!verify) {
            console.error("Invalid signature");
            return;
          }

          await prismaclient.$transaction(async (txn) => {
            await txn.websiteTick.create({
              data: {
                websiteId: website.id,
                validatorId,
                status,
                latency,
                createdAt: new Date(),
              },
            });

            await txn.validator.update({
              // Update validator, not website
              where: {
                id: validatorId,
              },
              data: {
                pendingPayout: {
                  increment: COST_PER_VALIDATION,
                },
              },
            });
          });
        }
      };
    });
  }
}, 60 * 1000); // 1 minute
