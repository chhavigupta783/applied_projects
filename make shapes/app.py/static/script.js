document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const cornersInput = document.getElementById('corners');
    const sideLengthInput = document.getElementById('side_length');
    const shapeCanvas = document.getElementById('shape-canvas');
    const shapeInfo = document.getElementById('shape-info');
    
    generateBtn.addEventListener('click', generateShape);
    
    // Generate a default shape on page load
    generateShape();
    
    function generateShape() {
        const corners = parseInt(cornersInput.value);
        const sideLength = parseFloat(sideLengthInput.value);
        
        // Clear previous shape
        shapeCanvas.innerHTML = '';
        
        // Show loading state
        shapeInfo.innerHTML = '<p>Generating shape...</p>';
        
        // Send request to server
        fetch('/generate_shape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `corners=${corners}&side_length=${sideLength}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                shapeInfo.innerHTML = `<p class="error">Error: ${data.error}</p>`;
                return;
            }
            
            // Draw the shape
            drawShape(data.points, data.corners, data.side_length);
            
            // Update shape information
            updateShapeInfo(data.corners, data.side_length);
        })
        .catch(error => {
            console.error('Error:', error);
            shapeInfo.innerHTML = '<p class="error">Failed to generate shape. Please try again.</p>';
        });
    }
    
    function drawShape(points, corners, sideLength) {
        // Create polygon
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        
        // Set points
        let pointsString = '';
        points.forEach(point => {
            pointsString += `${point.x},${point.y} `;
        });
        polygon.setAttribute('points', pointsString.trim());
        
        // Set style with random gradient
        const colors = generateColorGradient(corners);
        polygon.setAttribute('fill', `url(#shapeGradient)`);
        polygon.setAttribute('stroke', '#ffffff');
        polygon.setAttribute('stroke-width', '2');
        polygon.setAttribute('filter', 'url(#shadow)');
        
        // Add gradient definition
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Create gradient
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'shapeGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');
        
        colors.forEach((color, index) => {
            const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop.setAttribute('offset', `${index * 100 / (colors.length - 1)}%`);
            stop.setAttribute('stop-color', color);
            gradient.appendChild(stop);
        });
        
        // Create shadow filter
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'shadow');
        filter.setAttribute('x', '-20%');
        filter.setAttribute('y', '-20%');
        filter.setAttribute('width', '140%');
        filter.setAttribute('height', '140%');
        
        const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
        feDropShadow.setAttribute('dx', '2');
        feDropShadow.setAttribute('dy', '2');
        feDropShadow.setAttribute('stdDeviation', '5');
        feDropShadow.setAttribute('flood-color', 'rgba(0,0,0,0.5)');
        
        filter.appendChild(feDropShadow);
        defs.appendChild(gradient);
        defs.appendChild(filter);
        
        shapeCanvas.appendChild(defs);
        shapeCanvas.appendChild(polygon);
        
        // Add corner markers for visual interest
        points.forEach((point, index) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', point.x);
            circle.setAttribute('cy', point.y);
            circle.setAttribute('r', '5');
            circle.setAttribute('fill', '#ffffff');
            circle.setAttribute('stroke', '#333333');
            circle.setAttribute('stroke-width', '1');
            shapeCanvas.appendChild(circle);
            
            // Add corner numbers
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', point.x);
            text.setAttribute('y', point.y - 10);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', '#ffffff');
            text.setAttribute('font-size', '12');
            text.setAttribute('font-weight', 'bold');
            text.textContent = index + 1;
            shapeCanvas.appendChild(text);
        });
    }
    
    function generateColorGradient(corners) {
        // Generate a color gradient based on number of corners
        const hueStep = 360 / corners;
        const colors = [];
        
        for (let i = 0; i < corners; i++) {
            const hue = (i * hueStep) % 360;
            colors.push(`hsl(${hue}, 70%, 60%)`);
        }
        
        return colors;
    }
    
    function updateShapeInfo(corners, sideLength) {
        // Calculate shape properties
        const perimeter = corners * sideLength;
        const apothem = sideLength / (2 * Math.tan(Math.PI / corners));
        const area = 0.5 * perimeter * apothem;
        
        // Update shape information display
        shapeInfo.innerHTML = `
            <h3>Shape Information</h3>
            <p><strong>Type:</strong> ${getShapeName(corners)}</p>
            <p><strong>Number of Corners:</strong> ${corners}</p>
            <p><strong>Side Length:</strong> ${sideLength}px</p>
            <p><strong>Perimeter:</strong> ${perimeter.toFixed(2)}px</p>
            <p><strong>Area:</strong> ${area.toFixed(2)}px²</p>
        `;
    }
    
    function getShapeName(corners) {
        const names = {
            3: 'Triangle',
            4: 'Square',
            5: 'Pentagon',
            6: 'Hexagon',
            7: 'Heptagon',
            8: 'Octagon',
            9: 'Nonagon',
            10: 'Decagon'
        };
        
        return names[corners] || `${corners}-sided Polygon`;
    }
});