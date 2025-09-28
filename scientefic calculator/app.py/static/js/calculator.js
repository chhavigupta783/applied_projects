// Calculator state
let displayValue = '0';
let historyValue = '';
let memoryValue = 0;
let isRadians = false;
let dataSet = [];

// DOM elements
const displayElement = document.getElementById('display');
const historyElement = document.getElementById('history');
const modeIndicator = document.getElementById('mode-indicator');
const memoryDisplay = document.getElementById('memory-display');

// Update display
function updateDisplay() {
    displayElement.textContent = displayValue;
    historyElement.textContent = historyValue;
    modeIndicator.textContent = isRadians ? 'RAD' : 'DEG';
    memoryDisplay.textContent = `Memory: ${memoryValue}`;
}

// Add to display
function addToDisplay(value) {
    if (displayValue === '0' && value !== '.') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

// Clear all
function clearAll() {
    displayValue = '0';
    historyValue = '';
    updateDisplay();
}

// Clear entry
function clearEntry() {
    displayValue = '0';
    updateDisplay();
}

// Backspace
function backspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

// Calculate result
function calculate() {
    try {
        // Replace display symbols with JavaScript equivalents
        let expression = displayValue
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/\^/g, '**');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Update history and display
        historyValue = displayValue + ' =';
        displayValue = parseFloat(result.toPrecision(12)).toString();
        
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

// Memory functions
function memoryClear() {
    memoryValue = 0;
    updateDisplay();
}

function memoryRecall() {
    displayValue = memoryValue.toString();
    updateDisplay();
}

function memoryAdd() {
    memoryValue += parseFloat(displayValue) || 0;
    updateDisplay();
}

function memorySubtract() {
    memoryValue -= parseFloat(displayValue) || 0;
    updateDisplay();
}

// Toggle degree/radian mode
function toggleMode() {
    isRadians = !isRadians;
    updateDisplay();
}

// Mathematical functions
function squareRoot() {
    const value = parseFloat(displayValue);
    if (value >= 0) {
        historyValue = `√(${displayValue}) =`;
        displayValue = Math.sqrt(value).toString();
        updateDisplay();
    } else {
        displayValue = 'Error';
        updateDisplay();
    }
}

function square() {
    const value = parseFloat(displayValue);
    historyValue = `(${displayValue})² =`;
    displayValue = (value * value).toString();
    updateDisplay();
}

function cubeRoot() {
    const value = parseFloat(displayValue);
    historyValue = `∛(${displayValue}) =`;
    displayValue = Math.cbrt(value).toString();
    updateDisplay();
}

function factorial() {
    const value = parseInt(displayValue);
    if (value < 0 || !Number.isInteger(value)) {
        displayValue = 'Error';
        updateDisplay();
        return;
    }
    
    let result = 1;
    for (let i = 2; i <= value; i++) {
        result *= i;
    }
    
    historyValue = `${displayValue}! =`;
    displayValue = result.toString();
    updateDisplay();
}

function percentage() {
    const value = parseFloat(displayValue);
    historyValue = `${displayValue}% =`;
    displayValue = (value / 100).toString();
    updateDisplay();
}

// Trigonometric functions
function sin() {
    let value = parseFloat(displayValue);
    if (!isRadians) {
        value = value * Math.PI / 180;
    }
    historyValue = `sin(${displayValue}) =`;
    displayValue = Math.sin(value).toString();
    updateDisplay();
}

function cos() {
    let value = parseFloat(displayValue);
    if (!isRadians) {
        value = value * Math.PI / 180;
    }
    historyValue = `cos(${displayValue}) =`;
    displayValue = Math.cos(value).toString();
    updateDisplay();
}

function tan() {
    let value = parseFloat(displayValue);
    if (!isRadians) {
        value = value * Math.PI / 180;
    }
    historyValue = `tan(${displayValue}) =`;
    displayValue = Math.tan(value).toString();
    updateDisplay();
}

function asin() {
    let value = parseFloat(displayValue);
    if (value < -1 || value > 1) {
        displayValue = 'Error';
        updateDisplay();
        return;
    }
    
    let result = Math.asin(value);
    if (!isRadians) {
        result = result * 180 / Math.PI;
    }
    
    historyValue = `sin⁻¹(${displayValue}) =`;
    displayValue = result.toString();
    updateDisplay();
}

function acos() {
    let value = parseFloat(displayValue);
    if (value < -1 || value > 1) {
        displayValue = 'Error';
        updateDisplay();
        return;
    }
    
    let result = Math.acos(value);
    if (!isRadians) {
        result = result * 180 / Math.PI;
    }
    
    historyValue = `cos⁻¹(${displayValue}) =`;
    displayValue = result.toString();
    updateDisplay();
}

function atan() {
    let value = parseFloat(displayValue);
    let result = Math.atan(value);
    if (!isRadians) {
        result = result * 180 / Math.PI;
    }
    
    historyValue = `tan⁻¹(${displayValue}) =`;
    displayValue = result.toString();
    updateDisplay();
}

// Hyperbolic functions
function sinh() {
    const value = parseFloat(displayValue);
    historyValue = `sinh(${displayValue}) =`;
    displayValue = Math.sinh(value).toString();
    updateDisplay();
}

function cosh() {
    const value = parseFloat(displayValue);
    historyValue = `cosh(${displayValue}) =`;
    displayValue = Math.cosh(value).toString();
    updateDisplay();
}

function tanh() {
    const value = parseFloat(displayValue);
    historyValue = `tanh(${displayValue}) =`;
    displayValue = Math.tanh(value).toString();
    updateDisplay();
}

// Logarithmic functions
function log() {
    const value = parseFloat(displayValue);
    if (value <= 0) {
        displayValue = 'Error';
        updateDisplay();
        return;
    }
    
    historyValue = `log(${displayValue}) =`;
    displayValue = Math.log10(value).toString();
    updateDisplay();
}

function ln() {
    const value = parseFloat(displayValue);
    if (value <= 0) {
        displayValue = 'Error';
        updateDisplay();
        return;
    }
    
    historyValue = `ln(${displayValue}) =`;
    displayValue = Math.log(value).toString();
    updateDisplay();
}

// Exponential functions
function exp() {
    const value = parseFloat(displayValue);
    historyValue = `e^(${displayValue}) =`;
    displayValue = Math.exp(value).toString();
    updateDisplay();
}

function power10() {
    const value = parseFloat(displayValue);
    historyValue = `10^(${displayValue}) =`;
    displayValue = Math.pow(10, value).toString();
    updateDisplay();
}

// Statistics functions
function addData() {
    const value = parseFloat(displayValue);
    if (!isNaN(value)) {
        dataSet.push(value);
        historyValue = `Data: [${dataSet.join(', ')}]`;
        displayValue = '0';
        updateDisplay();
    }
}

function clearData() {
    dataSet = [];
    historyValue = 'Data cleared';
    displayValue = '0';
    updateDisplay();
}

function mean() {
    if (dataSet.length === 0) {
        displayValue = 'No data';
        updateDisplay();
        return;
    }
    
    const sum = dataSet.reduce((a, b) => a + b, 0);
    const meanValue = sum / dataSet.length;
    
    historyValue = `Mean =`;
    displayValue = meanValue.toString();
    updateDisplay();
}

function stdDev() {
    if (dataSet.length === 0) {
        displayValue = 'No data';
        updateDisplay();
        return;
    }
    
    const meanValue = dataSet.reduce((a, b) => a + b, 0) / dataSet.length;
    const squareDiffs = dataSet.map(value => Math.pow(value - meanValue, 2));
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / dataSet.length;
    const stdDevValue = Math.sqrt(avgSquareDiff);
    
    historyValue = `Std Dev =`;
    displayValue = stdDevValue.toString();
    updateDisplay();
}

function variance() {
    if (dataSet.length === 0) {
        displayValue = 'No data';
        updateDisplay();
        return;
    }
    
    const meanValue = dataSet.reduce((a, b) => a + b, 0) / dataSet.length;
    const squareDiffs = dataSet.map(value => Math.pow(value - meanValue, 2));
    const varianceValue = squareDiffs.reduce((a, b) => a + b, 0) / dataSet.length;
    
    historyValue = `Variance =`;
    displayValue = varianceValue.toString();
    updateDisplay();
}

function combinations() {
    const n = parseInt(displayValue);
    displayValue = '0';
    historyValue = `Enter r for nCr (n=${n})`;
    updateDisplay();
    
    // This would need a more complex implementation to get r value
    // For now, we'll just calculate factorial
    factorial();
}

function permutations() {
    const n = parseInt(displayValue);
    displayValue = '0';
    historyValue = `Enter r for nPr (n=${n})`;
    updateDisplay();
    
    // This would need a more complex implementation to get r value
    // For now, we'll just calculate factorial
    factorial();
}

function sum() {
    if (dataSet.length === 0) {
        displayValue = 'No data';
        updateDisplay();
        return;
    }
    
    const sumValue = dataSet.reduce((a, b) => a + b, 0);
    historyValue = `Sum =`;
    displayValue = sumValue.toString();
    updateDisplay();
}

function min() {
    if (dataSet.length === 0) {
        displayValue = 'No data';
        updateDisplay();
        return;
    }
    
    const minValue = Math.min(...dataSet);
    historyValue = `Min =`;
    displayValue = minValue.toString();
    updateDisplay();
}

function max() {
    if (dataSet.length === 0) {
        displayValue = 'No data';
        updateDisplay();
        return;
    }
    
    const maxValue = Math.max(...dataSet);
    historyValue = `Max =`;
    displayValue = maxValue.toString();
    updateDisplay();
}

// Converter functions
function convertLength() {
    const value = parseFloat(displayValue);
    const metersToFeet = value * 3.28084;
    historyValue = `${value}m = ${metersToFeet.toFixed(4)}ft`;
    displayValue = metersToFeet.toString();
    updateDisplay();
}

function convertWeight() {
    const value = parseFloat(displayValue);
    const kgToPounds = value * 2.20462;
    historyValue = `${value}kg = ${kgToPounds.toFixed(4)}lb`;
    displayValue = kgToPounds.toString();
    updateDisplay();
}

function convertTemperature() {
    const value = parseFloat(displayValue);
    const celsiusToFahrenheit = (value * 9/5) + 32;
    historyValue = `${value}°C = ${celsiusToFahrenheit.toFixed(2)}°F`;
    displayValue = celsiusToFahrenheit.toString();
    updateDisplay();
}

function convertArea() {
    const value = parseFloat(displayValue);
    const sqmToSqft = value * 10.7639;
    historyValue = `${value}m² = ${sqmToSqft.toFixed(4)}ft²`;
    displayValue = sqmToSqft.toString();
    updateDisplay();
}

function convertVolume() {
    const value = parseFloat(displayValue);
    const cubicmToGallons = value * 264.172;
    historyValue = `${value}m³ = ${cubicmToGallons.toFixed(4)}gal`;
    displayValue = cubicmToGallons.toString();
    updateDisplay();
}

// Tab switching
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active-tab');
    }
    
    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show the selected tab content and activate the button
    document.getElementById(tabName).classList.add('active-tab');
    event.currentTarget.classList.add('active');
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        addToDisplay(key);
    } else if (key === '.') {
        addToDisplay('.');
    } else if (key === '+') {
        addToDisplay('+');
    } else if (key === '-') {
        addToDisplay('-');
    } else if (key === '*') {
        addToDisplay('*');
    } else if (key === '/') {
        addToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '(') {
        addToDisplay('(');
    } else if (key === ')') {
        addToDisplay(')');
    } else if (key === '^') {
        addToDisplay('^');
    }
});

// Initialize display
updateDisplay();