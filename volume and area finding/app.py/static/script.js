document.addEventListener('DOMContentLoaded', function() {
    const shapeItems = document.querySelectorAll('.shape-item');
    const shapeTitle = document.getElementById('shapeTitle');
    const inputSection = document.getElementById('inputSection');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultSection = document.getElementById('resultSection');
    const resultsDiv = document.getElementById('results');
    
    let currentShape = null;
    
    // Shape configurations
    const shapeConfigs = {
        rectangle: {
            name: 'Rectangle',
            inputs: [
                { id: 'length', label: 'Length', type: 'number', step: 'any' },
                { id: 'width', label: 'Width', type: 'number', step: 'any' }
            ]
        },
        square: {
            name: 'Square',
            inputs: [
                { id: 'side', label: 'Side Length', type: 'number', step: 'any' }
            ]
        },
        circle: {
            name: 'Circle',
            inputs: [
                { id: 'radius', label: 'Radius', type: 'number', step: 'any' }
            ]
        },
        triangle: {
            name: 'Triangle',
            inputs: [
                { id: 'base', label: 'Base', type: 'number', step: 'any' },
                { id: 'height', label: 'Height', type: 'number', step: 'any' },
                { id: 'side1', label: 'Side 1', type: 'number', step: 'any' },
                { id: 'side2', label: 'Side 2', type: 'number', step: 'any' },
                { id: 'side3', label: 'Side 3', type: 'number', step: 'any' }
            ]
        },
        rhombus: {
            name: 'Rhombus',
            inputs: [
                { id: 'diagonal1', label: 'Diagonal 1', type: 'number', step: 'any' },
                { id: 'diagonal2', label: 'Diagonal 2', type: 'number', step: 'any' },
                { id: 'side', label: 'Side Length', type: 'number', step: 'any' }
            ]
        },
        kite: {
            name: 'Kite',
            inputs: [
                { id: 'diagonal1', label: 'Diagonal 1', type: 'number', step: 'any' },
                { id: 'diagonal2', label: 'Diagonal 2', type: 'number', step: 'any' },
                { id: 'side1', label: 'Side 1', type: 'number', step: 'any' },
                { id: 'side2', label: 'Side 2', type: 'number', step: 'any' }
            ]
        },
        parallelogram: {
            name: 'Parallelogram',
            inputs: [
                { id: 'base', label: 'Base', type: 'number', step: 'any' },
                { id: 'height', label: 'Height', type: 'number', step: 'any' },
                { id: 'side1', label: 'Side 1', type: 'number', step: 'any' },
                { id: 'side2', label: 'Side 2', type: 'number', step: 'any' }
            ]
        },
        trapezoid: {
            name: 'Trapezoid',
            inputs: [
                { id: 'base1', label: 'Base 1', type: 'number', step: 'any' },
                { id: 'base2', label: 'Base 2', type: 'number', step: 'any' },
                { id: 'height', label: 'Height', type: 'number', step: 'any' },
                { id: 'side1', label: 'Side 1', type: 'number', step: 'any' },
                { id: 'side2', label: 'Side 2', type: 'number', step: 'any' }
            ]
        },
        ellipse: {
            name: 'Ellipse',
            inputs: [
                { id: 'axis1', label: 'Major Axis', type: 'number', step: 'any' },
                { id: 'axis2', label: 'Minor Axis', type: 'number', step: 'any' }
            ]
        },
        cube: {
            name: 'Cube',
            inputs: [
                { id: 'side', label: 'Side Length', type: 'number', step: 'any' }
            ]
        },
        cuboid: {
            name: 'Cuboid',
            inputs: [
                { id: 'length', label: 'Length', type: 'number', step: 'any' },
                { id: 'width', label: 'Width', type: 'number', step: 'any' },
                { id: 'height', label: 'Height', type: 'number', step: 'any' }
            ]
        },
        sphere: {
            name: 'Sphere',
            inputs: [
                { id: 'radius', label: 'Radius', type: 'number', step: 'any' }
            ]
        },
        cylinder: {
            name: 'Cylinder',
            inputs: [
                { id: 'radius', label: 'Radius', type: 'number', step: 'any' },
                { id: 'height', label: 'Height', type: 'number', step: 'any' }
            ]
        },
        cone: {
            name: 'Cone',
            inputs: [
                { id: 'radius', label: 'Radius', type: 'number', step: 'any' },
                { id: 'height', label: 'Height', type: 'number', step: 'any' },
                { id: 'slant_height', label: 'Slant Height', type: 'number', step: 'any' }
            ]
        },
        pyramid: {
            name: 'Pyramid',
            inputs: [
                { id: 'base_area', label: 'Base Area', type: 'number', step: 'any' },
                { id: 'height', label: 'Height', type: 'number', step: 'any' }
            ]
        },
        hemisphere: {
            name: 'Hemisphere',
            inputs: [
                { id: 'radius', label: 'Radius', type: 'number', step: 'any' }
            ]
        }
    };
    
    // Shape selection
    shapeItems.forEach(item => {
        item.addEventListener('click', function() {
            const shape = this.getAttribute('data-shape');
            selectShape(shape);
        });
    });
    
    function selectShape(shape) {
        // Remove active class from all shapes
        shapeItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to selected shape
        document.querySelector(`[data-shape="${shape}"]`).classList.add('active');
        
        // Update current shape
        currentShape = shape;
        
        // Update UI
        shapeTitle.textContent = shapeConfigs[shape].name;
        renderInputs(shape);
        calculateBtn.disabled = false;
        resultSection.style.display = 'none';
    }
    
    function renderInputs(shape) {
        const config = shapeConfigs[shape];
        let html = '<h3>Enter Dimensions</h3>';
        
        config.inputs.forEach(input => {
            html += `
                <div class="input-group">
                    <label for="${input.id}">${input.label}:</label>
                    <input type="${input.type}" id="${input.id}" step="${input.step}" placeholder="Enter ${input.label.toLowerCase()}">
                </div>
            `;
        });
        
        inputSection.innerHTML = html;
    }
    
    // Calculate button click
    calculateBtn.addEventListener('click', calculate);
    
    function calculate() {
        if (!currentShape) return;
        
        const parameters = {};
        const inputs = inputSection.querySelectorAll('input');
        let hasError = false;
        
        // Collect input values
        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (isNaN(value) || value <= 0) {
                input.style.borderColor = '#e74c3c';
                hasError = true;
            } else {
                input.style.borderColor = '#e0e0e0';
                parameters[input.id] = value;
            }
        });
        
        if (hasError) {
            showError('Please enter valid positive numbers for all dimensions.');
            return;
        }
        
        // Send request to server
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shape: currentShape,
                parameters: parameters
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayResults(data.result);
            } else {
                showError(data.error || 'An error occurred during calculation.');
            }
        })
        .catch(error => {
            showError('Network error: ' + error.message);
        });
    }
    
    function displayResults(result) {
        let html = '';
        
        for (const [key, value] of Object.entries(result)) {
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `
                <div class="result-item">
                    <span class="result-label">${label}:</span>
                    <span class="result-value">${value}</span>
                </div>
            `;
        }
        
        resultsDiv.innerHTML = html;
        resultSection.style.display = 'block';
        
        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    function showError(message) {
        resultsDiv.innerHTML = `<div class="error-message">${message}</div>`;
        resultSection.style.display = 'block';
    }
    
    // Allow Enter key to trigger calculation
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !calculateBtn.disabled) {
            calculate();
        }
    });
});