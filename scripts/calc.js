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
        const display = (document.getElementById("result").innerHTML).length;
        if (display < 10) {
            if (((number1 === "") && (previousButton === "")) || (previousButton === "operator")) {
                replace(number.textContent);
                previousButton = "number";
                if ((number1 === "") || (!active)) {
                    replaceHistory(number.textContent);
                } else {
                    appendHistory(number.textContent);
                }
            } else
                if (previousButton === "number") {
                    append(number.textContent);
                    appendHistory(number.textContent);
                }
        }
    });
});

// Calculator functions
calcFunctions.forEach((calcFunction) => {
    calcFunction.addEventListener("click", () => {
        switch (calcFunction.textContent) {
            case "AC":
                reset();
                break;
            case "+/-":
                sign();
                break;
            case "%":
                percentage();
                break;
            case "Del":
                del();
                break;
            case ".":
                decimal();
                break;
            default:
                console.error("Error 002: Function not implemented.");
        }
    });
});

// Calculator operators
calcOperators.forEach((calcOperator) => {
    calcOperator.addEventListener("click", () => {
        if ((calcOperator.textContent === "=") && (active)) {
            number2 = getNumber();
            let result = operate(number1, number2, operator);
            result = Math.round(result * 1000) / 1000;
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

// Keyboard listener
window.addEventListener('keydown', keyboardInput);

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
    if (n2 != 0) {
        return n1 / n2;
    } else {
        replaceHistory("Oh snap! You can't divide by zero");
        return 0;
    }
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

// Retrieve the operation from the secondary display
function getHistory() {
    const history = document.getElementById("operation").innerHTML;
    return history;
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

// +/- function
function sign() {
    let number = getNumber();
    number *= -1;
    replace(number);
}

// % function
function percentage() {
    let number = getNumber();
    number /= 100;
    replace(number);
}

// Del function
function del() {
    let number = getNumber();
    number = number.toString();
    let history = getHistory();
    if (number.length > 1) {
        number = number.slice(0, -1);
        replace(number);
        history = history.slice(0, -1);
        replaceHistory(history);
    } else {
        replace("0");
        replaceHistory("0");
    }
}

// Decimal separator
function decimal() {
    let display = document.getElementById("result").innerHTML;

    if ((display === "0") && (number1 === "")) {
        replace("0.");
        replaceHistory("0.");
        previousButton = "number";
    } else
        if ((number2 === "") && (previousButton === "operator")) {
            replace("0.");
            appendHistory("0.");
            previousButton = "number";
        } else
            if ((number1 != "") && (number2 != "") && (previousButton === "operator")) {
                replace("0.");
                replaceHistory("0.");
                previousButton = "number";
            } else
                if (display.indexOf(".") === -1) {
                    append(".");
                    appendHistory(".");
                }
}

// KEYBOARD FUNCTIONS
function keyboardInput(e) {
    if ((e.key >= 0) && (e.key <= 9)) {

    }
}