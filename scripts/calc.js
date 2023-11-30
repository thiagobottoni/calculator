// GLOBAL VARIABLES
// Initializes global variables
let number1 = "";
let number2 = "";
let operator = "";
let previousButton = "";
let active = false;

// Calculator buttons
const calcNumbers = document.querySelectorAll(".number");
const calcFunctions = document.querySelectorAll(".function");
const calcOperators = document.querySelectorAll(".operator");

// EVENT LISTENERS
// Calculator numbers
calcNumbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (((number1 === "") && (previousButton === "")) || (previousButton === "operator")) {
            replace(number.textContent);
            previousButton = "number";
            if (number1 === "") {
                replaceHistory(number.textContent);
            } else {
                appendHistory(number.textContent);
            }
        } else
            if (previousButton === "number") {
                append(number.textContent);
                appendHistory(number.textContent);
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
        if ((calcOperator.textContent === "=") && (active === true)) {
            number2 = getNumber();
            let result = operate(number1, number2, operator);
            replace(result);
            appendHistory(" = ");
            previousButton = "operator";
            active = false;
        } else
            if (calcOperator.textContent != "=") {
                number1 = getNumber();
                operator = calcOperator.textContent;
                previousButton = "operator";
                replaceHistory(number1);
                appendHistory(" " + operator + " ");
                active = true;
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
// Replace number from the main display
function replace(number) {
    document.getElementById("result").innerHTML = number;
}

// Append number to the main display
function append(number) {
    const screen = document.getElementById("result");
    const textToAppend = document.createTextNode(number);
    screen.appendChild(textToAppend);
}

// Retrieve number from the main display
function getNumber() {
    let number = document.getElementById("result").innerHTML;
    number = parseFloat(number);
    return number;
}

// SECONDARY SCREEN FUNCTIONS (history)
// Replace operations from the secondary display
function replaceHistory(text) {
    document.getElementById("operation").innerHTML = text;
}

// Append number or operators to the secondary display
function appendHistory(text) {
    const screen = document.getElementById("operation");
    const textToAppend = document.createTextNode(text);
    screen.appendChild(textToAppend);
}

// CALCULATOR FUNCTIONS
// AC function
function reset() {
    number1 = "";
    number2 = "";
    operator = "";
    previousButton = "";
    document.getElementById("result").innerHTML = 0;
    document.getElementById("operation").innerHTML = "Let's do some math!";
}