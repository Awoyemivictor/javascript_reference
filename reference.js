log = console.log;

//////////////////// VALUE PROPERTIES //////////////////
// globalThis
function canMakeHTTPRequest() {
    return typeof globalThis.XMLHttpRequest === 'function';
}

// console.log(canMakeHTTPRequest());

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


// Infinity
const maxNumber = Math.pow(10, 1000); // Max positive number
if (maxNumber === Infinity) {
    // Expected output: "Let's call it infinity!"
}

// console.log(1 / maxNumber);
// Expected output: 0

// Using Infinity
// console.log(Infinity);
// console.log(Infinity + 1);
// console.log(Math.pow(10, 1000));
// console.log(Math.log(0));
// console.log(1 / Infinity);
// console.log(1 / 0);


// NaN
function sanitise(x) {
    if (isNaN(x)) {
        return NaN;
    }
    return x;
}
// console.log(sanitise('1'));
// Expected output: "1"
// console.log(sanitise('NotANumber'));
// Expected output: NaN

// Testing against NaN
NaN === NaN; // false
Number.NaN === NaN;

function valueIsNaN(v) {
    return v !== v;
}
// log(valueIsNaN(1));
// log(valueIsNaN(NaN));
// log(valueIsNaN(Number.NaN));


// Undefined
function test(t) {
    if (t === undefined) {
        return 'Undefined value!';
    }
    return t;
}
let x;
log(test(x))



///////////////////////// FUNCTION PROPERTIES /////////////////////////
// eval
console.lo