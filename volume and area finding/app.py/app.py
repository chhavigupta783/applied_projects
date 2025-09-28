from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

class ShapeCalculator:
    @staticmethod
    def calculate_rectangle_area(length, width):
        return length * width
    
    @staticmethod
    def calculate_rectangle_perimeter(length, width):
        return 2 * (length + width)
    
    @staticmethod
    def calculate_square_area(side):
        return side * side
    
    @staticmethod
    def calculate_square_perimeter(side):
        return 4 * side
    
    @staticmethod
    def calculate_circle_area(radius):
        return math.pi * radius * radius
    
    @staticmethod
    def calculate_circle_circumference(radius):
        return 2 * math.pi * radius
    
    @staticmethod
    def calculate_triangle_area(base, height):
        return 0.5 * base * height
    
    @staticmethod
    def calculate_triangle_perimeter(side1, side2, side3):
        return side1 + side2 + side3
    
    @staticmethod
    def calculate_rhombus_area(diagonal1, diagonal2):
        return 0.5 * diagonal1 * diagonal2
    
    @staticmethod
    def calculate_rhombus_perimeter(side):
        return 4 * side
    
    @staticmethod
    def calculate_kite_area(diagonal1, diagonal2):
        return 0.5 * diagonal1 * diagonal2
    
    @staticmethod
    def calculate_kite_perimeter(side1, side2):
        return 2 * (side1 + side2)
    
    @staticmethod
    def calculate_cone_volume(radius, height):
        return (1/3) * math.pi * radius * radius * height
    
    @staticmethod
    def calculate_cone_surface_area(radius, slant_height):
        return math.pi * radius * (radius + slant_height)
    
    @staticmethod
    def calculate_cylinder_volume(radius, height):
        return math.pi * radius * radius * height
    
    @staticmethod
    def calculate_cylinder_surface_area(radius, height):
        return 2 * math.pi * radius * (radius + height)
    
    @staticmethod
    def calculate_sphere_volume(radius):
        return (4/3) * math.pi * radius * radius * radius
    
    @staticmethod
    def calculate_sphere_surface_area(radius):
        return 4 * math.pi * radius * radius
    
    @staticmethod
    def calculate_cube_volume(side):
        return side * side * side
    
    @staticmethod
    def calculate_cube_surface_area(side):
        return 6 * side * side
    
    @staticmethod
    def calculate_cuboid_volume(length, width, height):
        return length * width * height
    
    @staticmethod
    def calculate_cuboid_surface_area(length, width, height):
        return 2 * (length * width + width * height + height * length)
    
    @staticmethod
    def calculate_parallelogram_area(base, height):
        return base * height
    
    @staticmethod
    def calculate_parallelogram_perimeter(side1, side2):
        return 2 * (side1 + side2)
    
    @staticmethod
    def calculate_trapezoid_area(base1, base2, height):
        return 0.5 * (base1 + base2) * height
    
    @staticmethod
    def calculate_trapezoid_perimeter(side1, side2, base1, base2):
        return side1 + side2 + base1 + base2
    
    @staticmethod
    def calculate_pyramid_volume(base_area, height):
        return (1/3) * base_area * height
    
    @staticmethod
    def calculate_ellipse_area(axis1, axis2):
        return math.pi * axis1 * axis2
    
    @staticmethod
    def calculate_hemisphere_volume(radius):
        return (2/3) * math.pi * radius * radius * radius
    
    @staticmethod
    def calculate_hemisphere_surface_area(radius):
        return 3 * math.pi * radius * radius

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        shape_type = data.get('shape')
        parameters = data.get('parameters', {})
        
        calculator = ShapeCalculator()
        result = {}
        
        if shape_type == 'rectangle':
            length = float(parameters.get('length', 0))
            width = float(parameters.get('width', 0))
            result['area'] = calculator.calculate_rectangle_area(length, width)
            result['perimeter'] = calculator.calculate_rectangle_perimeter(length, width)
            
        elif shape_type == 'square':
            side = float(parameters.get('side', 0))
            result['area'] = calculator.calculate_square_area(side)
            result['perimeter'] = calculator.calculate_square_perimeter(side)
            
        elif shape_type == 'circle':
            radius = float(parameters.get('radius', 0))
            result['area'] = calculator.calculate_circle_area(radius)
            result['circumference'] = calculator.calculate_circle_circumference(radius)
            
        elif shape_type == 'triangle':
            base = float(parameters.get('base', 0))
            height = float(parameters.get('height', 0))
            side1 = float(parameters.get('side1', 0))
            side2 = float(parameters.get('side2', 0))
            side3 = float(parameters.get('side3', 0))
            result['area'] = calculator.calculate_triangle_area(base, height)
            result['perimeter'] = calculator.calculate_triangle_perimeter(side1, side2, side3)
            
        elif shape_type == 'rhombus':
            diagonal1 = float(parameters.get('diagonal1', 0))
            diagonal2 = float(parameters.get('diagonal2', 0))
            side = float(parameters.get('side', 0))
            result['area'] = calculator.calculate_rhombus_area(diagonal1, diagonal2)
            result['perimeter'] = calculator.calculate_rhombus_perimeter(side)
            
        elif shape_type == 'kite':
            diagonal1 = float(parameters.get('diagonal1', 0))
            diagonal2 = float(parameters.get('diagonal2', 0))
            side1 = float(parameters.get('side1', 0))
            side2 = float(parameters.get('side2', 0))
            result['area'] = calculator.calculate_kite_area(diagonal1, diagonal2)
            result['perimeter'] = calculator.calculate_kite_perimeter(side1, side2)
            
        elif shape_type == 'cone':
            radius = float(parameters.get('radius', 0))
            height = float(parameters.get('height', 0))
            slant_height = float(parameters.get('slant_height', 0))
            result['volume'] = calculator.calculate_cone_volume(radius, height)
            result['surface_area'] = calculator.calculate_cone_surface_area(radius, slant_height)
            
        elif shape_type == 'cylinder':
            radius = float(parameters.get('radius', 0))
            height = float(parameters.get('height', 0))
            result['volume'] = calculator.calculate_cylinder_volume(radius, height)
            result['surface_area'] = calculator.calculate_cylinder_surface_area(radius, height)
            
        elif shape_type == 'sphere':
            radius = float(parameters.get('radius', 0))
            result['volume'] = calculator.calculate_sphere_volume(radius)
            result['surface_area'] = calculator.calculate_sphere_surface_area(radius)
            
        elif shape_type == 'cube':
            side = float(parameters.get('side', 0))
            result['volume'] = calculator.calculate_cube_volume(side)
            result['surface_area'] = calculator.calculate_cube_surface_area(side)
            
        elif shape_type == 'cuboid':
            length = float(parameters.get('length', 0))
            width = float(parameters.get('width', 0))
            height = float(parameters.get('height', 0))
            result['volume'] = calculator.calculate_cuboid_volume(length, width, height)
            result['surface_area'] = calculator.calculate_cuboid_surface_area(length, width, height)
            
        elif shape_type == 'parallelogram':
            base = float(parameters.get('base', 0))
            height = float(parameters.get('height', 0))
            side1 = float(parameters.get('side1', 0))
            side2 = float(parameters.get('side2', 0))
            result['area'] = calculator.calculate_parallelogram_area(base, height)
            result['perimeter'] = calculator.calculate_parallelogram_perimeter(side1, side2)
            
        elif shape_type == 'trapezoid':
            base1 = float(parameters.get('base1', 0))
            base2 = float(parameters.get('base2', 0))
            height = float(parameters.get('height', 0))
            side1 = float(parameters.get('side1', 0))
            side2 = float(parameters.get('side2', 0))
            result['area'] = calculator.calculate_trapezoid_area(base1, base2, height)
            result['perimeter'] = calculator.calculate_trapezoid_perimeter(side1, side2, base1, base2)
            
        elif shape_type == 'pyramid':
            base_area = float(parameters.get('base_area', 0))
            height = float(parameters.get('height', 0))
            result['volume'] = calculator.calculate_pyramid_volume(base_area, height)
            
        elif shape_type == 'ellipse':
            axis1 = float(parameters.get('axis1', 0))
            axis2 = float(parameters.get('axis2', 0))
            result['area'] = calculator.calculate_ellipse_area(axis1, axis2)
            
        elif shape_type == 'hemisphere':
            radius = float(parameters.get('radius', 0))
            result['volume'] = calculator.calculate_hemisphere_volume(radius)
            result['surface_area'] = calculator.calculate_hemisphere_surface_area(radius)
        
        # Round results to 2 decimal places
        for key in result:
            result[key] = round(result[key], 2)
            
        return jsonify({'success': True, 'result': result})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8080)