let operator = null;
let firstNumber = null;
let secondNumber = null;
let displayNumber = 0;
let pressedNumber = null;
let pressedOperator = null;
let operatorSelected = false;


let display = document.getElementById('display');
display.textContent = displayNumber;

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function() {
        pressedNumber = this.textContent;
        console.log(pressedNumber);

        if (displayNumber === 0 || operatorSelected) {
            displayNumber = pressedNumber;
            operatorSelected = false;
        } else  {
            displayNumber = displayNumber + pressedNumber;
        }
        display.textContent = displayNumber;
        
    });
});



document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
        pressedOperator = this.textContent; // Saves the operator
        console.log(pressedOperator); 
        operatorSelected = true; // To start the displayNuber new
        firstNumber = parseInt(displayNumber, 10); // Save the displayNumber as an Integer in the firstNumber
        operator = pressedOperator;
    });
});


// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b !== 0 ? a / b : "Fehler";
}
