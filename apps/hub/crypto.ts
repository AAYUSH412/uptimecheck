import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import { createLogger } from './logger.js';

const log = createLogger('crypto');

/**
 * Verifies a NaCl detached signature against a Solana public key.
 * Returns true if the signature is valid, false otherwise.
 */
export async function verifyMessage(
  message: string,
  publicKey: string,
  signedMessage: string,
): Promise<boolean> {
  try {
    const messageBytes = naclUtil.decodeUTF8(message);
    const result = nacl.sign.detached.verify(
      messageBytes,
      new Uint8Array(JSON.parse(signedMessage)),
      new PublicKey(publicKey).toBytes(),
    );
    return result;
  } catch (err) {
    log.error('Message verification failed', err);
    return false;
  }
}
