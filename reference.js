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


// Undefinedd
function test(t) {
    if (t === undefined) {
        return 'Undefined value!';
    }
    return t;
}
let x;
// log(test(x));



///////////////////////// FUNCTION PROPERTIES /////////////////////////
// eval
// log(eval('2 + 2'));
// log(eval(new String('2 + 2')));
// log(eval('2 + 2') === eval('4'));
// log(eval('2 + 2') == eval(new String('2 + 2')));

const expression = new String("2 + 2");
// log(eval(String(expression)))

// Indicrect call using the comma operator to return eval
// (0, eval)("x + y");
// Indirect call through optional chaining
// eval?.("x + y");
// Indirect call using a variable to store and return eval
const geval = eval;
// geval("x + y");
// Indirect call using member access
const obj = { eval };
// obj.eval("x + y");

function test() {
    const x = 2;
    const y = 4;
    // Direct call, uses local scope
    // log(eval("x + y")); 
    // log(eval?.("x + y"));
}

// Indirect eavl would not inherit the strictness of the surrounding context, and would only
// be in strict mode if the source string itself has a "use strict" directive/
function strictContext() {
    "use strict";
    // eval?.(`with (Math) console.log(PI)`);
}

function strictContextStrictEval() {
    "use strict";
    // eval?.(`"use strict"; with (Math) console.log(PI);`);
}

strictContext();
strictContextStrictEval();

// Direct eval inherits the strictness of the invoking context
function nonStrictContext() {
    // eval(`with (Math) console.log(PI)`);
}

function strictContext2() {
    "use strict";
    // eval(`with (Math) console.log(PI);`);
}
nonStrictContext();
strictContext2();

// Neither context nor source string is strict, so var creates a variable in the surrounding scope
eval("var a = 1;");
// console.log(a); 
// Context is not strict, but eval source is strict, so b is scoped to the evaluated script
eval("'use scrict'; var ba = 1;");
// console.log(ba);

function strictContext3() {
    "use strict";
    // Context is strict, but this is indirect and the source string is not strict,
    // so c is still global
    eval?.("var c = 1;");
    // Direct eval in a strict context, so d is scoped
    eval("var d = 1;");
}
strictContext3();
// console.log(c);
// console.log(d);

// Direct eval may have access to additional contextual expressions. For example, in a function's body,
// once can use new.target
function Ctor() {
    // eval("console.log(new.target)");
}
new Ctor();

// Using indirect eval
// ***
function looseJsonParse1(obj) {
    return eval(`(${obj})`);
}
// console.log(looseJsonParse1("{ a: 4 - 1, b: function () {}, c: new Date() }"));
// with indirect eval
function looseJsonParse2(obj) {
    return eval?.(`"use strict";(${obj})`);
}
// console.log(looseJsonParse2("{ a: 4 - 1, b: function () {}, c: new Date() }"));

// Using the Function() constructor
function Date(n) {
    return [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ] [n % 7 || 0];
}
function runCodeWithDateFunction(obj) {
    return Function("Date", `"use strict";return (${obj});`)(Date);
}
// console.log(runCodeWithDateFunction("Date(5)"));

// Using bracket accessors
const obj1 = { a: 20, b: 30 };
const propName1 = getPropName();
const result = obj[propName1];

function getPropName(){}
// Using eval to access descendant propperties
const obj2 = { a: 20, b: 30 };
const propPath = getPropPath();
const result2 = eval(`obj.${propPath}`);

function getPropPath(){}

// Avoid eval() here could be done by splitting the property path and looping through the different properties
function getDescendantProp(obj, desc) {
    const arr = desc.split(".");
    while (arr.length) {
        obj = obj[arr.shift()];
    }
    return obj;
}

const obj3 = { a: { b: { c: 0 } } };
const propPath3 = getPropPath();
// const result3 = getDescendantProp(obj3, propPath3);

// Setting a property that way works similarly
function setDescendantProp(obj, desc, value) {
    const arr = desc.split(".");
    while (arr.length > 1) {
        obj = obj[arr.shift()];
    }
    return (obj[arr[0]] = value);
}

const obj4 = { a: { b: { c: 0 } } };
const propPath4 = getPropPath();
// const result4 = setDescendantProp(obj4, propPath4, 1);

// Using callbacks
// Instead of setTimeout("...", 1000) use:
setTimeout(() => {
    // ...
}, 1000);

// Instead of elt.setAttribute("onclick", "...") use:
// elt.addEventListener("click", () => {
//     // ...
// });

// Using JSON
const x1 = 2;
const y1 = 39;
const z1 = "42";
// console.log(eval("x1 + y1 + 1"));
// console.log(z1);

// eval() returns the completion value of statements
const str1 = "if (a) { 1 + 1 } else { 1 + 2 }";
let a1 = true;
let b1 = eval(str1);

// console.log(`b1 is: ${b1}`);

a1 = false;
b1 = eval(str1);

// console.log(`b is: ${b1}`);




// Writing calculator function
function myCalculator() {
    let input = document.getElementById("input").value;
    let result = eval(input);
    console.log(result);
} 


//=================isFinite()==================/
function div(x) {
    if (isFinite(1000 / x)) {
        return 'Number is NOT Infinity.';
    }
    return 'Number is Infinity!';
}

// console.log(div(0));
// console.log(div(1));

// Examples
// console.log(isFinite(Infinity));
// console.log(isFinite(NaN));
// console.log(isFinite(-Infinity));

// console.log(isFinite(0));
// console.log(isFinite(2e64));
// console.log(isFinite(910));

// // Would've been false with the more robust Number.isFinite();
// console.log(isFinite(null));
// console.log(isFinite("0"));


//==================isNan()=================/
function milliseconds(x) {
    if (isNaN(x)) {
        return 'Not a number!';
    }
    return x * 1000;
}
// console.log(milliseconds('100F'));
// console.log(milliseconds('0.0314E+2'));


//=====================parseFloat()===========/
function circumference(r) {
    return parseFloat(r) * 2.0 * Math.PI;
}

console.log(circumference(4.567));
console.log(circumference('4.457abcdefgh'));
console.log(circumference('-Infinity abcdefgh'));

// Examples
console.log(parseFloat(3.14));
console.log(parseFloat("3.14"));
console.log(parseFloat(" 3.14 "));
console.log(parseFloat("314e-2"));
console.log(parseFloat("0.0314E+2"));
console.log(parseFloat("3.14some non-digit characters"));
parseFloat({
    toString() {
        return "3.14";
    },
});

// parseFloat() returning NaN
console.log(parseFloat("FF2"));
console.log(parseFloat("NaN"));

// Returning Infinity
console.log(parseFloat(1.7976931348623159e+308));
console.log(parseFloat(-1.7976931348623159e+308));

// Interaction with Bright values
console.log(parseFloat(900719925474099267n));
console.log(parseFloat("900719925474099267n"));
console.log(parseFloat("900719925474099267"));