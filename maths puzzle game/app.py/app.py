from flask import Flask, render_template, request, session, redirect, url_for
import random

app = Flask(__name__)
app.secret_key = "secret123"   # session ke liye required

# Question generator
def generate_question():
    a = random.randint(1, 20)
    b = random.randint(1, 20)
    op = random.choice(["+", "-", "*"])
    question = f"{a} {op} {b}"
    answer = eval(question)   # safe eval, only numbers + ops
    return question, answer

@app.route("/")
def index():
    if "score" not in session:
        session["score"] = 0
        session["attempts"] = 0

    # generate question and store correct answer
    question, answer = generate_question()
    session["answer"] = answer
    session["question"] = question
    return render_template(
        "index.html",
        question=question,
        score=session["score"],
        attempts=session["attempts"]
    )

@app.route("/check", methods=["POST"])
def check():
    user_answer = request.form.get("answer")
    correct_answer = session.get("answer")

    session["attempts"] += 1
    if user_answer and user_answer.lstrip("-").isdigit() and int(user_answer) == correct_answer:
        session["score"] += 1
        result = "✅ Correct!"
    else:
        result = f"❌ Wrong! Correct Answer was {correct_answer}"

    return render_template(
        "result.html",
        result=result,
        score=session["score"],
        attempts=session["attempts"]
    )

@app.route("/reset")
def reset():
    session.clear()
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
