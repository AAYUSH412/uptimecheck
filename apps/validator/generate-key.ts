import { Keypair } from "@solana/web3.js";
import * as fs from "fs";

// Generate a new random keypair
const keypair = Keypair.generate();

console.log("Public Key:", keypair.publicKey.toString());

// Convert the secret key to a JSON array format
const secretKey = JSON.stringify(Array.from(keypair.secretKey));

console.log("\nPrivate Key (for .env file):");
console.log(secretKey);
