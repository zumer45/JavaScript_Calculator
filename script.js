const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Function to display number in the calculator display
function sendNumberValue(number) {
  // If the user just selected an operator, clear the display and set awaitingNextValue to false
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    // If the display is currently 0, replace it with the new number. Otherwise, append the new number to the existing display value
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

// Function to add a decimal point to the display value
function addDecimal() {
  // If awaitingNextValue is true, do nothing
  if (awaitingNextValue) {
    return;
  }
  // If the display value doesn't already contain a decimal point, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Object containing functions to perform calculations for each operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

// Function to handle when the user selects an operator
function userOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // If there is already an operator and the user has just entered a new operator, update the operator value and return
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // If this is the first value entered, set it as the first value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    // If there is already a first value and operator, perform the calculation
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Set awaitingNextValue to true and update operatorValue
  awaitingNextValue = true;
  operatorValue = operator;
}

// Add event listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    // If the button has no class, it is a number button
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    // If the button has the "operator" class, it is an operator button
    inputBtn.addEventListener("click", () => userOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    // If the button has the "decimal" class, it is a decimal button
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset Display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Add event listener for clear button
clearBtn.addEventListener("click", resetAll);
