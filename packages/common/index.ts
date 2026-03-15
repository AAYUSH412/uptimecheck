export interface SignupIncomingMessage {
    ip:string,
    publicKey:string,
    signedMessage:string,
    callbackId:string,
    location?:string,
}


/** Validation result sent from validator → hub. */
export interface ValidateIncomingMessage{
    callbackId:string,
    signedMessage:string,
    status:'UP'|'DOWN',
    /** Response latency in ms. Null when the request timed out or errored. */
    latency:number | null,
    websiteId:string,
    validatorId:string,
}


export interface SignupOutgoingMessage {
    validatorId:string,
    callbackId:string,
}

export interface ValidateOutgoingMessage {
    url:string,
    callbackId:string,
    websiteId:string,
}

export type IncomingMessage = {
    type: 'signup',
    data: SignupIncomingMessage
} | {
    type: 'validate',
    data: ValidateIncomingMessage
}

export type OutgoingMessage = {
    type: 'signup',
    data: SignupOutgoingMessage
} | {
    type: 'validate',
    data: ValidateOutgoingMessage
}
