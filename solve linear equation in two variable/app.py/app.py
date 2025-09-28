from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

class LinearEquationSolver:
    def parse_equation(self, equation):
        """Parse equation like '2x + 3y = 12' into coefficients"""
        equation = equation.replace(' ', '').lower()
        
        # Default coefficients
        a = b = c = 0
        
        # Find x coefficient
        x_match = re.search(r'([+-]?\d*)x', equation)
        if x_match:
            coef = x_match.group(1)
            if coef == '' or coef == '+':
                a = 1
            elif coef == '-':
                a = -1
            else:
                a = float(coef)
        
        # Find y coefficient
        y_match = re.search(r'([+-]?\d*)y', equation)
        if y_match:
            coef = y_match.group(1)
            if coef == '' or coef == '+':
                b = 1
            elif coef == '-':
                b = -1
            else:
                b = float(coef)
        
        # Find constant term
        equals_pos = equation.find('=')
        if equals_pos != -1:
            constant_part = equation[equals_pos + 1:]
            c = float(constant_part) if constant_part else 0
        
        return a, b, c
    
    def solve_2_variables(self, eq1, eq2):
        """Solve two linear equations"""
        a1, b1, c1 = self.parse_equation(eq1)
        a2, b2, c2 = self.parse_equation(eq2)
        
        steps = []
        steps.append("Given equations:")
        steps.append(f"1) {a1}x + {b1}y = {c1}")
        steps.append(f"2) {a2}x + {b2}y = {c2}")
        steps.append("")
        
        # Calculate determinant
        D = a1 * b2 - a2 * b1
        steps.append(f"Step 1: Calculate determinant D = a1*b2 - a2*b1")
        steps.append(f"D = ({a1})*({b2}) - ({a2})*({b1}) = {D}")
        steps.append("")
        
        if D == 0:
            steps.append("The equations are dependent or inconsistent.")
            steps.append("No unique solution exists.")
            return steps
        
        # Calculate Dx and Dy
        Dx = c1 * b2 - c2 * b1
        Dy = a1 * c2 - a2 * c1
        
        steps.append(f"Step 2: Calculate Dx = c1*b2 - c2*b1")
        steps.append(f"Dx = ({c1})*({b2}) - ({c2})*({b1}) = {Dx}")
        steps.append("")
        
        steps.append(f"Step 3: Calculate Dy = a1*c2 - a2*c1")
        steps.append(f"Dy = ({a1})*({c2}) - ({a2})*({c1}) = {Dy}")
        steps.append("")
        
        # Calculate x and y
        x = Dx / D
        y = Dy / D
        
        steps.append(f"Step 4: Calculate x = Dx/D")
        steps.append(f"x = {Dx} / {D} = {round(x, 2)}")
        steps.append("")
        
        steps.append(f"Step 5: Calculate y = Dy/D")
        steps.append(f"y = {Dy} / {D} = {round(y, 2)}")
        steps.append("")
        
        steps.append("✅ Final Solution:")
        steps.append(f"x = {round(x, 2)}")
        steps.append(f"y = {round(y, 2)}")
        steps.append("")
        
        # Verification
        steps.append("🔍 Verification:")
        verify1 = a1 * x + b1 * y
        verify2 = a2 * x + b2 * y
        steps.append(f"Equation 1: {a1}*{round(x, 2)} + {b1}*{round(y, 2)} = {round(verify1, 2)} (should be {c1})")
        steps.append(f"Equation 2: {a2}*{round(x, 2)} + {b2}*{round(y, 2)} = {round(verify2, 2)} (should be {c2})")
        
        return steps

solver = LinearEquationSolver()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve_linear', methods=['POST'])
def solve_linear():
    data = request.get_json()
    eq1 = data.get('equation1', '')
    eq2 = data.get('equation2', '')
    
    try:
        steps = solver.solve_2_variables(eq1, eq2)
        return jsonify({
            'success': True,
            'steps': steps
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='127.0.0.1')