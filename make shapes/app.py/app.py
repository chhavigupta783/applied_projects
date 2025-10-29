from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_shape', methods=['POST'])
def generate_shape():
    try:
        corners = int(request.form.get('corners', 3))
        side_length = float(request.form.get('side_length', 100))
        
        # Validate inputs
        if corners < 3:
            return jsonify({'error': 'Number of corners must be at least 3'})
        if side_length <= 0:
            return jsonify({'error': 'Side length must be positive'})
        
        # Calculate polygon points
        points = calculate_polygon_points(corners, side_length)
        
        return jsonify({
            'points': points,
            'corners': corners,
            'side_length': side_length
        })
    except Exception as e:
        return jsonify({'error': str(e)})

def calculate_polygon_points(corners, side_length):
    points = []
    center_x, center_y = 250, 250  # Center of the canvas
    
    # Calculate radius from side length
    radius = side_length / (2 * math.sin(math.pi / corners))
    
    for i in range(corners):
        angle = 2 * math.pi * i / corners - math.pi / 2  # Start from top
        x = center_x + radius * math.cos(angle)
        y = center_y + radius * math.sin(angle)
        points.append({'x': x, 'y': y})
    
    return points

if __name__ == '__main__':
    app.run(debug=True)