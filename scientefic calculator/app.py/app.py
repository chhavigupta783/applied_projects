from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def calculator():
    return render_template('calculator.html')

@app.route('/health')
def health_check():
    return {'status': 'healthy', 'message': 'Scientific Calculator is running'}

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)