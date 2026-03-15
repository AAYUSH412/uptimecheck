import { z } from 'zod';

// -------------------------------------------------------------------------
// Incoming message schemas (Validator → Hub)
// -------------------------------------------------------------------------

export const SignupIncomingSchema = z.object({
  ip: z.string(),
  publicKey: z.string().min(32),
  signedMessage: z.string(),
  callbackId: z.string().uuid(),
  location: z.string().optional(),
});

export const ValidateIncomingSchema = z.object({
  callbackId: z.string().uuid(),
  signedMessage: z.string(),
  status: z.enum(['UP', 'DOWN']),
  latency: z.number().nullable(),
  websiteId: z.string(),
  validatorId: z.string(),
});

export const IncomingMessageSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('signup'), data: SignupIncomingSchema }),
  z.object({ type: z.literal('validate'), data: ValidateIncomingSchema }),
]);

// -------------------------------------------------------------------------
// Outgoing message schemas (Hub → Validator)
// -------------------------------------------------------------------------

export const SignupOutgoingSchema = z.object({
  validatorId: z.string(),
  callbackId: z.string().uuid(),
});

export const ValidateOutgoingSchema = z.object({
  url: z.string().url(),
  callbackId: z.string().uuid(),
  websiteId: z.string(),
});

export const OutgoingMessageSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('signup'), data: SignupOutgoingSchema }),
  z.object({ type: z.literal('validate'), data: ValidateOutgoingSchema }),
]);

// -------------------------------------------------------------------------
// Inferred types (replace hand-written interfaces if desired)
// -------------------------------------------------------------------------

export type SignupIncomingSchemaType = z.infer<typeof SignupIncomingSchema>;
export type ValidateIncomingSchemaType = z.infer<typeof ValidateIncomingSchema>;
export type IncomingMessageSchemaType = z.infer<typeof IncomingMessageSchema>;
export type SignupOutgoingSchemaType = z.infer<typeof SignupOutgoingSchema>;
export type ValidateOutgoingSchemaType = z.infer<typeof ValidateOutgoingSchema>;
export type OutgoingMessageSchemaType = z.infer<typeof OutgoingMessageSchema>;
