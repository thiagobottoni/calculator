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
        if ((number1 === 0) && (previousButton === "")) {
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
        operator = calcOperator.textContent;
        if (operator === "=") {
            number2 = getNumber();
            let result = operate(number1, number2, operator);
            replace(result);
            previousButton = "operator";
        } else {
            number1 = getNumber();
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

// SCREEN FUNCTIONS
function replace(number) {
    document.getElementById("result").innerHTML = number;
}

function append(number) {
    const screen = document.getElementById("result");
    const textToAppend = document.createTextNode(number);
    screen.appendChild(textToAppend);
}

function getNumber() {

    return document.getElementById("result").innerHTML;
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