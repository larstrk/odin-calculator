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

let display = document.getElementById('display');
display.textContent = displayNumber;

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function() {
        pressedNumber = this.textContent;
        if (displayNumber === 0 || operatorSelected) {
            displayNumber = pressedNumber;
            operatorSelected = false;
        } else  {
            displayNumber = displayNumber + pressedNumber;
        }
        display.textContent = displayNumber;
        
    });
});

document.querySelectorAll('.dot').forEach(button => {
    button.addEventListener('click', function() {
        pressedNumber = this.textContent;
        
        if (!dot) {
            if (displayNumber === 0 || operatorSelected) {
                displayNumber = pressedNumber;
                operatorSelected = false;
            } else  {
                displayNumber = displayNumber + pressedNumber;
            }
            display.textContent = displayNumber;
        }
        dot = true;
    });
});



document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
        dot = false;
        displayNumber = parseFloat(display.textContent);

        if (!firstNumberSet) {
            setFristNumber(displayNumber);
            console.log("First Number set to " + firstNumber);
        } else {
            setSecondNumber(displayNumber);
            console.log("Second Number set to " + secondNumber);
        }

        if (firstNumberSet && secondNumberSet) {
            result = operate(operator, firstNumber, secondNumber);
            console.log("Result: " + result);
            setFristNumber(result);
            secondNumberSet = false;
            display.textContent = result;
        } 

        operator = this.textContent; // Saves the operator
        
        console.log("Operator set to " + operator); 
        operatorSelected = true; // To start the displayNumber new        
    });
});

document.querySelectorAll('.clear-memory').forEach(button => {
    button.addEventListener('click', function() {
        operator = null;
        firstNumber = null;
        firstNumberSet = false;
        secondNumber = null;
        secondNumberSet = false;
        displayNumber = 0;
        pressedNumber = null;
        operatorSelected = false;
        result = null;

        display.textContent = displayNumber;
    });
});

document.querySelectorAll('.delete-last-number').forEach(button => {
    button.addEventListener('click', function() {
        console.log("Display " + displayNumber)
        if (displayNumber.length > 1) {
            displayNumber = displayNumber.slice(0, -1); 
        } else {
            displayNumber = 0; 
        }

        display.textContent = displayNumber; 
    });
});

document.querySelectorAll('.equal').forEach(button => {
    button.addEventListener('click', function() {
        equal = true;
        if (!firstNumberSet) {
            setFristNumber(displayNumber);
            console.log("First Number set to " + firstNumber);
        } else {
            setSecondNumber(displayNumber);
            console.log("Second Number set to " + secondNumber);
        }

        if (firstNumberSet && secondNumberSet) {
            result = operate(operator, firstNumber, secondNumber);
            console.log("Result: " + result);
            setFristNumber(result);
    
            secondNumberSet = false;
            firstNumberSet = false;
            display.textContent = result;

            console.log("first number set to " + firstNumber);
            console.log("first number set: " + firstNumberSet);
        }
    });
});

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

function setFristNumber(number) {
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
    let result = a * b;
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

function divide(a, b) {
    if (b === 0) {
        return "Error";
    } else {
        let result = a / b;
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
}