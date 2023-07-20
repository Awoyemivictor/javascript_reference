// globalThis
function canMakeHTTPRequest() {
    return typeof globalThis.XMLHttpRequest === 'function';
}

console.log(canMakeHTTPRequest());

function check(it) {
    // Math is known to exist as a global in every environment.
    return it && it.Math === Math && it;
}

// Example 2
function check(it) {
    // Math is known to exist as a global in every environment.
    return it && it.Math === Math && it;
}

const globalObject =
    check(typeof window === "object" && window) ||
    check(typeof self === "object" && self) ||
    check(typeof global === "object" && global) ||
    // This returns undefined when running in strict mode
    (function () {
        return this;
    })() ||
    Function("return this")();

if (typeof globalObject.Intl === "undefined") {
    // No Intl in this environment; define our own on the global scope
    Object.defineProperty(globalObject, "Intl", {
        value: {
            // Our Intl implementation
        },
        enumerable: false,
        configurable: true,
        writable: true,
    });
}

