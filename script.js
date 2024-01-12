/**
 * Calculator Logic
 * This script provides the functionality for a basic calculator. 
 * It supports addition, subtraction, multiplication, division, and handling of decimal numbers.
 */

// Initial setup of calculator's state
let operator = null;
let firstNumber = null;
let firstNumberSet = false;
let secondNumber = null;
let secondNumberSet = false;
let displayNumber = 0;
let pressedNumber = null;
let operatorSelected = false;
let result = null;
let dot = false;

// Access the calculator's display
let display = document.getElementById('display');
updateDisplay();

/**
 * Updates the calculator's display with the current display number.
 */
function updateDisplay() {
    display.textContent = displayNumber;
}

// Event listener for number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function() {
        handleNumberInput(this.textContent);
        
    });
});

// Handles the logic for when a number is pressed.
function handleNumberInput(number) {
    if (displayNumber === 0 || operatorSelected) {
        displayNumber = number;
        operatorSelected = false;
    } else {
        displayNumber += number;
    }
    updateDisplay();
}

// Event listener for dot button
document.querySelectorAll('.dot').forEach(button => {
    button.addEventListener('click', function() {
        pressedNumber = this.textContent;
        dotInput();
        
    });
});

// Checks if on the display is already a dot and handels the outcome.
function dotInput() {
    if (!dot) {
        if (displayNumber === 0 || operatorSelected) {
            displayNumber = pressedNumber;
            operatorSelected = false;
        } else  {
            displayNumber += pressedNumber;
        }
        updateDisplay();
    }
    dot = true;
}

// Event listener for operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
        saveNumber(); 
        saveOperator(this.textContent);
                
    });
});

// Saves the number that is on the display when an operator is pressed
function saveNumber() {
    dot = false;
    displayNumber = parseFloat(display.textContent);

    setNumber(displayNumber);
    doOperation();
}

// Check if first and second number are set and if yes: operate.
function doOperation() {
    if (firstNumberSet && secondNumberSet) {
        result = operate(operator, firstNumber, secondNumber);
        setFirstNumber(result);
        secondNumberSet = false;
        display.textContent = result;
    }
}

function setNumber(number) {
    if (!firstNumberSet) {
        setFirstNumber(number);
    } else {
        setSecondNumber(number);
    }
}

// Saves the operator that is pressed
function saveOperator(operatorInput) {
    // Saves the operator
    operator = operatorInput;
    
    // To start the displayNumber new
    operatorSelected = true; 
}

// Event listener for clear button
document.querySelectorAll('.clear-memory').forEach(button => {
    button.addEventListener('click', resetCalculator);
});

// Resets the calculator to its initial state.
function resetCalculator() {
    operator = null;
        firstNumber = null;
        firstNumberSet = false;
        secondNumber = null;
        secondNumberSet = false;
        displayNumber = 0;
        pressedNumber = null;
        operatorSelected = false;
        result = null;

        updateDisplay();
}


document.querySelectorAll('.delete-last-number').forEach(button => {
    button.addEventListener('click', function() {
        console.log("Display " + displayNumber)
        if (displayNumber.length > 1) {
            displayNumber = displayNumber.slice(0, -1); 
        } else {
            displayNumber = 0; 
        }

        updateDisplay();
    });
});

// Event listener for equal button
document.querySelectorAll('.equal').forEach(button => {
    button.addEventListener('click', handleEqual);
});

// Sets the number and does operation but also sets first number to false.
function handleEqual() {
    equal = true;
    setNumber(displayNumber);

    if (firstNumberSet && secondNumberSet) {
        result = operate(operator, firstNumber, secondNumber);
        setFirstNumber(result);

        secondNumberSet = false;
        firstNumberSet = false;
        display.textContent = result;
    }
}

// Checks which operator was pressed and does math operation depanding on that.
function operate (operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (operator === "x") {
        return multiply(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "+") {
        return add(a, b);
    } else if (operator === "/") {
        return divide(a, b)
    }
}

function setFirstNumber(number) {
    firstNumber = parseFloat(number);
    firstNumberSet = true;
}

function setSecondNumber(number) {
    secondNumber = parseFloat(number);
    secondNumberSet = true;
}

// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return roundResult(a * b);
}

function divide(a, b) {
    if (b === 0) {
        return "Error";
    } else {
        return roundResult(a / b);
        
    }
}

// Check if result needs to be roundes and if yes do it up to 5 dezimals
function roundResult(result) {
    let resultString = result.toString();
        
    // Prüfen, ob das Ergebnis Dezimalstellen hat
    if (resultString.includes('.')) {
        let decimalPart = resultString.split('.')[1];
        if (decimalPart.length > 5) {
            return parseFloat(result.toFixed(5));
        }
    }
    return result;
}