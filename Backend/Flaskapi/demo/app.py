from flask import Flask, render_template, jsonify, request
import config
import aipresentation
from detect_ai import detect_ai
from plag_cheker import get_plag_report


def page_not_found(e):
  return render_template('404.html'), 404


app = Flask(__name__)
app.config.from_object(config.config['development'])
app.register_error_handler(404, page_not_found)


@app.route('/detectai', methods = ['POST'])
def aidetect():
  if request.method == 'POST':
    text = request.form['text']
    res = {}
    res['result'] = detect_ai(text)
    return jsonify(res), 200
  return render_template('index.html', **locals())

@app.route('/checkplag', methods = ['POST'])
def plagiarism():
  if request.method == 'POST':
    text = request.form['text']
    res = {}
    res['report'] = get_plag_report(text)
    return jsonify(res), 200
  return render_template('index.html', **locals())

@app.route('/powerpoint', methods = ['POST'])
def powerpoint():
  if request.method == 'POST':
    user_id =  request.form['id']
    prompt = request.form['prompt']
    res = {}
    file_path = aipresentation.get_presentation(prompt, user_id)
    res['presentation_link'] = f"{request.host_url}{file_path}"
    return jsonify(res), 200
  return render_template('index.html', **locals())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
