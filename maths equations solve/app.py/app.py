from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

class MathSolver:
    def solve_equation(self, equation):
        try:
            # Clean the equation
            equation = equation.replace(' ', '').replace('×', '*').replace('÷', '/')
            equation = equation.replace('π', str(math.pi)).replace('e', str(math.e))
            
            # Handle different types of equations
            if '=' in equation:
                return self.solve_algebraic(equation)
            else:
                return self.solve_expression(equation)
                
        except Exception as e:
            return f"Error: {str(e)}"
    
    def solve_expression(self, expr):
        try:
            # Replace functions
            expr = expr.replace('^', '**')
            expr = expr.replace('√', 'math.sqrt')
            expr = expr.replace('sin', 'math.sin')
            expr = expr.replace('cos', 'math.cos')
            expr = expr.replace('tan', 'math.tan')
            expr = expr.replace('log', 'math.log10')
            expr = expr.replace('ln', 'math.log')
            
            result = eval(expr)
            return f"Result: {round(result, 6)}"
        except:
            return "Cannot solve this expression"
    
    def solve_algebraic(self, equation):
        try:
            left, right = equation.split('=')
            
            # Simple linear equation: ax + b = c
            if 'x' in left and right.isdigit():
                left = left.replace(' ', '')
                
                if '+' in left:
                    parts = left.split('+')
                    if 'x' in parts[0]:
                        a = parts[0].replace('x', '')
                        a = 1 if a == '' else float(a)
                        b = float(parts[1])
                        x = (float(right) - b) / a
                        return f"x = {round(x, 6)}"
                    else:
                        a = parts[1].replace('x', '')
                        a = 1 if a == '' else float(a)
                        b = float(parts[0])
                        x = (float(right) - b) / a
                        return f"x = {round(x, 6)}"
                
                elif '-' in left:
                    parts = left.split('-')
                    if 'x' in parts[0]:
                        a = parts[0].replace('x', '')
                        a = 1 if a == '' else float(a)
                        b = float(parts[1])
                        x = (float(right) + b) / a
                        return f"x = {round(x, 6)}"
                    else:
                        a = parts[1].replace('x', '')
                        a = 1 if a == '' else float(a)
                        b = float(parts[0])
                        x = (b - float(right)) / a
                        return f"x = {round(x, 6)}"
                
                elif '*' in left:
                    parts = left.split('*')
                    if 'x' in parts[0]:
                        a = parts[0].replace('x', '')
                        a = 1 if a == '' else float(a)
                        x = float(right) / a
                        return f"x = {round(x, 6)}"
                    else:
                        a = parts[1].replace('x', '')
                        a = 1 if a == '' else float(a)
                        x = float(right) / a
                        return f"x = {round(x, 6)}"
            
            return f"Equation: {left} = {right}"
            
        except:
            return "Cannot solve this equation"

solver = MathSolver()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    data = request.get_json()
    equation = data.get('equation', '')
    
    solution = solver.solve_equation(equation)
    
    return jsonify({
        'equation': equation,
        'solution': solution
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='127.0.0.1')