// GLOBAL VARIABLES
// Initializes global variables
let number1 = 0;
let number2 = 0;
let operator = "";
let previousButton = "";

// Calculator buttons
const calcNumbers = document.querySelectorAll(".number");
const calcFunctions = document.querySelectorAll(".function");
const calcOperators = document.querySelectorAll(".operator");

// EVENT LISTENERS
// Calculator numbers
calcNumbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (((number1 === 0) && (previousButton === "")) || (previousButton === "operator")) {
            replace(number.textContent);
            previousButton = "number";
        } else
            if (previousButton === "number") {
                append(number.textContent);
            }
    });
});

// Calculator functions
calcFunctions.forEach((calcFunction) => {
    calcFunction.addEventListener("click", () => {
        if (calcFunction.textContent === "AC") {
            reset();
        }
    });
});

// Calculator operators
calcOperators.forEach((calcOperator) => {
    calcOperator.addEventListener("click", () => {
        if (calcOperator.textContent === "=") {
            number2 = getNumber();
            console.log("number 2: " + number2);
            let result = operate(number1, number2, operator);
            replace(result);
            appendHistory(" " + operator + " ");
            appendHistory(number2);
            previousButton = "operator";
        } else {
            number1 = getNumber();
            console.log("number 1: " + number1);
            operator = calcOperator.textContent;
            previousButton = "operator";
            replaceHistory(number1);
        }
    });
});

// OPERATIONS
function operate(n1, n2, operator) {
    switch (operator) {
        case "+":
            return add(n1, n2);
            break;
        case "-":
            return subtract(n1, n2);
            break;
        case "x":
            return multiply(n1, n2);
            break;
        case "/":
            return divide(n1, n2);
            break;
        default:
            console.error("Error 001: Unexpected operator.")
    }
}

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

// PRIMARY SCREEN FUNCTIONS (result)
function replace(number) {
    document.getElementById("result").innerHTML = number;
}

function append(number) {
    const screen = document.getElementById("result");
    const textToAppend = document.createTextNode(number);
    screen.appendChild(textToAppend);
}

function getNumber() {
    let number = document.getElementById("result").innerHTML;
    number = parseFloat(number);
    return number;
}

// SECONDARY SCREEN FUNCTIONS (history)
function replaceHistory(text) {
    document.getElementById("operation").innerHTML = text;
}

function appendHistory(text) {
    const screen = document.getElementById("operation");
    const textToAppend = document.createTextNode(text);
    screen.appendChild(textToAppend);
}

// CALCULATOR FUNCTIONS
function reset() {
    number1 = 0;
    number2 = 0;
    operator = "";
    previousButton = "";
    document.getElementById("result").innerHTML = 0;
    document.getElementById("operation").innerHTML = "Let's do some math!";
}