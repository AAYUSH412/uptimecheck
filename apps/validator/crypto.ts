import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import { createLogger } from './logger.js';

const log = createLogger('crypto');

/**
 * Signs a UTF-8 message with the validator's Solana keypair using NaCl detached signatures.
 * Returns the signature as a JSON-stringified byte array (for WS transport).
 */
export async function signMessage(message: string, keypair: Keypair): Promise<string> {
  try {
    const messageBytes = naclUtil.decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
    return JSON.stringify(Array.from(signature));
  } catch (err) {
    log.error('Failed to sign message', err);
    throw err;
  }
}
