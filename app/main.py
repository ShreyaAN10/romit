from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/index/')
def hello():
    return '<h1>Nav to /signup please</h1>'

@app.route('/signup1/')
def signup():
    return render_template('index.html')

@app.route('/signup2/')
def signup2():
    return render_template('index2.html')

@app.route('/home/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run()