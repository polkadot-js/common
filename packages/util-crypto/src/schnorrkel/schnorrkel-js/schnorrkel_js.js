/* tslint:disable */
var wasm;

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* Sign a message
*
* The combination of both public and private key must be provided.
* This is effectively equivalent to a keypair.
*
* * public: UIntArray with 32 element
* * private: UIntArray with 64 element
* * message: Arbitrary length UIntArray
*
* * returned vector is the signature consisting of 64 bytes.
* @param {Uint8Array} arg0
* @param {Uint8Array} arg1
* @param {Uint8Array} arg2
* @returns {Uint8Array}
*/
module.exports.sign = function(arg0, arg1, arg2) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm(arg1);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray8ToWasm(arg2);
    const len2 = WASM_VECTOR_LEN;
    const retptr = globalArgumentPtr();
    try {
        wasm.sign(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
        wasm.__wbindgen_free(ptr1, len1 * 1);
        wasm.__wbindgen_free(ptr2, len2 * 1);

    }

};

/**
* Verify a message and its corresponding against a public key;
*
* * signature: UIntArray with 64 element
* * message: Arbitrary length UIntArray
* * pubkey: UIntArray with 32 element
* @param {Uint8Array} arg0
* @param {Uint8Array} arg1
* @param {Uint8Array} arg2
* @returns {boolean}
*/
module.exports.verify = function(arg0, arg1, arg2) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm(arg1);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray8ToWasm(arg2);
    const len2 = WASM_VECTOR_LEN;
    try {
        return (wasm.verify(ptr0, len0, ptr1, len1, ptr2, len2)) !== 0;

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
        wasm.__wbindgen_free(ptr1, len1 * 1);
        wasm.__wbindgen_free(ptr2, len2 * 1);

    }

};

/**
* Generate a secret key (aka. private key) from a seed phrase.
*
* * seed: UIntArray with 32 element
*
* returned vector is the private key consisting of 64 bytes.
* @param {Uint8Array} arg0
* @returns {Uint8Array}
*/
module.exports.secret_from_seed = function(arg0) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    const retptr = globalArgumentPtr();
    try {
        wasm.secret_from_seed(retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

};

/**
* Generate a key pair. .
*
* * seed: UIntArray with 32 element
*
* returned vector is the concatenation of first the private key (64 bytes)
* followed by the public key (32) bytes.
* @param {Uint8Array} arg0
* @returns {Uint8Array}
*/
module.exports.keypair_from_seed = function(arg0) {
    const ptr0 = passArray8ToWasm(arg0);
    const len0 = WASM_VECTOR_LEN;
    const retptr = globalArgumentPtr();
    try {
        wasm.keypair_from_seed(retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

};

// const TextDecoder = require('util').TextDecoder;

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

module.exports.__wbg_new_886f15c1b20b061b = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
};

function getObject(idx) { return heap[idx]; }

module.exports.__wbg_call_a2b503e0ee1234e4 = function(arg0, arg1) {
    return addHeapObject(getObject(arg0).call(getObject(arg1)));
};

module.exports.__wbg_self_ddd2d80076091e5f = function(arg0) {
    return addHeapObject(getObject(arg0).self);
};

module.exports.__wbg_crypto_4b7669ff1793d881 = function(arg0) {
    return addHeapObject(getObject(arg0).crypto);
};

module.exports.__wbg_getRandomValues_6de85818bd2ad699 = function(arg0) {
    return addHeapObject(getObject(arg0).getRandomValues);
};

module.exports.__wbg_getRandomValues_95cef5eed1acafda = function(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).getRandomValues(varg1);
};

module.exports.__wbg_require_86edd37cfda5f13d = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(require(varg0));
};

module.exports.__wbg_randomFillSync_571502126f344d60 = function(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).randomFillSync(varg1);
};

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

module.exports.__wbindgen_object_drop_ref = function(i) { dropObject(i); };

module.exports.__wbindgen_is_undefined = function(idx) {
    return getObject(idx) === undefined ? 1 : 0;
};

module.exports.__wbindgen_jsval_eq = function(a, b) {
    return getObject(a) === getObject(b) ? 1 : 0;
};

wasm = require('./schnorrkel_js_bg')(module.exports);
