// script.js
let display = document.getElementById('display');
let currentInput = '';
let operation = null;
let firstOperand = null;
let currentFunction = null;

function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    operation = null;
    firstOperand = null;
    currentFunction = null;
}

function appendNumber(number) {
    if (currentInput.length < 10) {
        currentInput += number;
        display.textContent = currentInput;
    }
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.textContent = currentInput;
    }
}

function setOperation(op) {
    if (currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operation) {
        firstOperand = calculate();
        display.textContent = firstOperand;
    }
    operation = op;
    currentInput = '';
    currentFunction = null;
}

function setFunction(func) {
    if (currentInput === '') return;
    currentFunction = func;
    firstOperand = parseFloat(currentInput);
    currentInput = '';
    display.textContent = `${func}(${firstOperand})`;
}

function calculate() {
    if (operation === null || currentInput === '') return firstOperand;
    let secondOperand = parseFloat(currentInput);
    let result = 0;
    switch (operation) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
    }
    return result;
}

function displayResult() {
    if (currentFunction) {
        let result = 0;
        switch (currentFunction) {
            case 'sin':
                result = Math.sin(toRadians(firstOperand));
                break;
            case 'cos':
                result = Math.cos(toRadians(firstOperand));
                break;
            case 'tan':
                result = Math.tan(toRadians(firstOperand));
                break;
        }
        display.textContent = result;
        currentInput = result.toString();
        currentFunction = null;
        firstOperand = null;
    } else if (operation !== null && currentInput !== '') {
        let result = calculate();
        display.textContent = result;
        currentInput = result.toString();
        operation = null;
        firstOperand = null;
    }
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
