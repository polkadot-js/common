/* tslint:disable */
export function sign(arg0: Uint8Array, arg1: Uint8Array, arg2: Uint8Array): Uint8Array;
export function verify(arg0: Uint8Array, arg1: Uint8Array, arg2: Uint8Array): boolean;
export function secret_from_seed(arg0: Uint8Array): Uint8Array;
export function keypair_from_seed(arg0: Uint8Array): Uint8Array;
export function isReady(): boolean;
export function waitReady(): Promise<boolean>;
