from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

def solve_by_substitution(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3):
    """
    Solve 3 variable linear equations using substitution method
    """
    steps = []
    
    # Step 1: Show original equations
    steps.append({
        'step': 1,
        'title': 'Given Equations',
        'description': 'Original system of equations',
        'equations': [
            f'{a1}x + {b1}y + {c1}z = {d1}',
            f'{a2}x + {b2}y + {c2}z = {d2}', 
            f'{a3}x + {b3}y + {c3}z = {d3}'
        ]
    })
    
    # Step 2: Express z from equation 1
    steps.append({
        'step': 2,
        'title': 'Express z from Equation 1',
        'description': f'From: {a1}x + {b1}y + {c1}z = {d1}',
        'equations': [
            f'{c1}z = {d1} - {a1}x - {b1}y',
            f'z = ({d1} - {a1}x - {b1}y) / {c1}'
        ]
    })
    
    z_expr = f'({d1} - {a1}x - {b1}y) / {c1}'
    
    # Step 3: Substitute z in equation 2
    eq2_sub = f'{a2}x + {b2}y + {c2}*({d1} - {a1}x - {b1}y)/{c1} = {d2}'
    steps.append({
        'step': 3,
        'title': 'Substitute z in Equation 2',
        'description': 'Replace z in second equation',
        'equations': [eq2_sub]
    })
    
    # Step 4: Simplify equation 2
    # Multiply both sides by c1 to eliminate denominator
    new_a2 = a2*c1 - c2*a1
    new_b2 = b2*c1 - c2*b1  
    new_c2 = d2*c1 - c2*d1
    
    steps.append({
        'step': 4,
        'title': 'Simplify Equation 2',
        'description': 'Multiply by denominator and simplify',
        'equations': [
            f'{new_a2}x + {new_b2}y = {new_c2}'
        ]
    })
    
    # Step 5: Substitute z in equation 3
    eq3_sub = f'{a3}x + {b3}y + {c3}*({d1} - {a1}x - {b1}y)/{c1} = {d3}'
    steps.append({
        'step': 5,
        'title': 'Substitute z in Equation 3',
        'description': 'Replace z in third equation',
        'equations': [eq3_sub]
    })
    
    # Step 6: Simplify equation 3
    new_a3 = a3*c1 - c3*a1
    new_b3 = b3*c1 - c3*b1
    new_c3 = d3*c1 - c3*d1
    
    steps.append({
        'step': 6,
        'title': 'Simplify Equation 3',
        'description': 'Multiply by denominator and simplify',
        'equations': [
            f'{new_a3}x + {new_b3}y = {new_c3}'
        ]
    })
    
    # Step 7: Now solve 2 equations with 2 variables
    steps.append({
        'step': 7,
        'title': 'New 2-Variable System',
        'description': 'Now we have 2 equations in x and y',
        'equations': [
            f'{new_a2}x + {new_b2}y = {new_c2}',
            f'{new_a3}x + {new_b3}y = {new_c3}'
        ]
    })
    
    # Step 8: Solve for y
    denominator = new_a2 * new_b3 - new_a3 * new_b2
    
    if abs(denominator) < 0.0001:
        raise ValueError("Equations have no unique solution")
    
    y = (new_a2 * new_c3 - new_a3 * new_c2) / denominator
    
    steps.append({
        'step': 8,
        'title': 'Solve for y',
        'description': 'Using elimination method',
        'equations': [
            f'y = ({new_a2}*{new_c3} - {new_a3}*{new_c2}) / ({new_a2}*{new_b3} - {new_a3}*{new_b2})',
            f'y = {y:.4f}'
        ]
    })
    
    # Step 9: Solve for x
    if abs(new_a2) > 0.0001:
        x = (new_c2 - new_b2 * y) / new_a2
        eq_desc = f'x = ({new_c2} - {new_b2}*{y:.4f}) / {new_a2}'
    else:
        x = (new_c3 - new_b3 * y) / new_a3  
        eq_desc = f'x = ({new_c3} - {new_b3}*{y:.4f}) / {new_a3}'
    
    steps.append({
        'step': 9,
        'title': 'Solve for x',
        'description': 'Substitute y value back',
        'equations': [eq_desc, f'x = {x:.4f}']
    })
    
    # Step 10: Solve for z
    z = (d1 - a1*x - b1*y) / c1
    steps.append({
        'step': 10,
        'title': 'Solve for z',
        'description': 'Substitute x and y into z expression',
        'equations': [
            f'z = ({d1} - {a1}*{x:.4f} - {b1}*{y:.4f}) / {c1}',
            f'z = {z:.4f}'
        ]
    })
    
    # Step 11: Verification
    verify1 = a1*x + b1*y + c1*z
    verify2 = a2*x + b2*y + c2*z  
    verify3 = a3*x + b3*y + c3*z
    
    steps.append({
        'step': 11,
        'title': 'Verification',
        'description': 'Check solutions in original equations',
        'equations': [
            f'Eq1: {a1}*{x:.4f} + {b1}*{y:.4f} + {c1}*{z:.4f} = {verify1:.4f} (should be {d1})',
            f'Eq2: {a2}*{x:.4f} + {b2}*{y:.4f} + {c2}*{z:.4f} = {verify2:.4f} (should be {d2})',
            f'Eq3: {a3}*{x:.4f} + {b3}*{y:.4f} + {c3}*{z:.4f} = {verify3:.4f} (should be {d3})'
        ]
    })
    
    return {
        'x': round(x, 4),
        'y': round(y, 4),
        'z': round(z, 4),
        'steps': steps,
        'verification': {
            'eq1': round(verify1, 4),
            'eq2': round(verify2, 4), 
            'eq3': round(verify3, 4)
        }
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    try:
        data = request.json
        
        # Get coefficients
        a1 = float(data.get('a1', 0))
        b1 = float(data.get('b1', 0))
        c1 = float(data.get('c1', 0))
        d1 = float(data.get('d1', 0))
        
        a2 = float(data.get('a2', 0))
        b2 = float(data.get('b2', 0))
        c2 = float(data.get('c2', 0))
        d2 = float(data.get('d2', 0))
        
        a3 = float(data.get('a3', 0))
        b3 = float(data.get('b3', 0))
        c3 = float(data.get('c3', 0))
        d3 = float(data.get('d3', 0))
        
        # Check for zero denominators
        if c1 == 0:
            return jsonify({'error': 'Coefficient of z in equation 1 cannot be zero'})
        
        # Solve equations
        result = solve_by_substitution(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)