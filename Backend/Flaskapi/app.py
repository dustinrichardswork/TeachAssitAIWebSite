from flask import Flask, render_template, jsonify, request, send_file, Response
import config
import lessonplannerapi
import quizapi
import math_quiz
import math_lesson
import grade_essay
import ytgpt
import aipresentation
import lesson_comp
from detect_ai import detect_ai
from plag_cheker import get_plag_report
from gptutils import get_title
import json
import openai
from getReport import genReport
from creHomework import creHomework
from creTest import createTest
from icebreakerIdeas import icebreaker_Ideas
from getESLActivity import genESLActivity
from getAdditionalAnswer import genAdditionalAns
import translators as tl
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from docx import Document
from pptx import Presentation
import json
from getQuizFromFile import genQuizFromFile
from flask_cors import CORS
from lessonplannerapi import get_links

def page_not_found(e):
  return render_template('404.html'), 404


app = Flask(__name__)
CORS(app)
app.config.from_object(config.config['development'])

app.register_error_handler(404, page_not_found)

openai.api_key = config.DevelopmentConfig.OPENAI_KEY
def send_messages(messages, model):
    return openai.ChatCompletion.create(
        model=model,
        messages=messages,
        stream=True
    )

def event_stream(messages, filename, reqLink=None):
    full_message = []
    model = 'gpt-3.5-turbo'
    if reqLink is not None:
        model = 'gpt-4-1106-preview'
    for line in send_messages(messages=messages, model=model):
        #print(line)
        text = line.choices[0].delta.get('content', '')
        if len(text): 
            full_message.append(text)
            yield text
    if reqLink is not None:
        yield reqLink
    str_message = ''.join(full_message)
    message = {"role": "assistant", "content": str_message}
    messages.append(message)
    with open(filename, "w") as outfile:
        json.dump(messages, outfile)
    

@app.route('/lessonplanner', methods = ['GET', 'POST'])
def lessonplanner():
    data = request.get_json()

    print('Here is your Data: ', data)

    conversation_id = data['conversation_id']
    user_id = data['user_id']

    data = data['prompt']
    language = data['language']
    question = str(data)

    messages, filename, links = lessonplannerapi.plan_lessons_chat(question, user_id,conversation_id, language)
    
    return Response(event_stream(messages, filename, links), mimetype='text/event-stream')

@app.route('/lessonplanner/chat', methods = ['GET', 'POST'])
def lessonplannerChat():
    data = request.get_json()

    print('Here is your Data: ', data)

    conversation_id = data['conversation_id']
    user_id = data['user_id']

    data = data['prompt']
    content = data['content']
    language = data['language']
    question = str(data)

    messages, filename, links = lessonplannerapi.plan_lessons_chat_followup(question, content, user_id,conversation_id, language)
    
    return Response(event_stream(messages, filename, links), mimetype='text/event-stream')

@app.route('/quiz', methods = ['POST'])
def quiz():
    data = request.get_json()
    user_id = data['user_id']
    conversation_id = data['conversation_id']

    print(data)
    data = data['prompt']

    grade = data['grade']
    quiz_topic = data['topic']
    subject = data['subject']
    summary = data['summary']
    quiz_type = data['type']
    qn = data['questionnumber']
    language = data['language']
    user_input = f"Grade: {grade}, subject: {subject}, topic: {quiz_topic}, type: {quiz_type}, note: {summary}, number of questions: {qn}"
    res = {}
    #res['quiz'] = quizapi.generate_quiz(user_input, user_id, conversation_id, language)
    #return jsonify(res), 200
    messages, filename = quizapi.generate_quiz(user_input, user_id, conversation_id, language)
    return Response(event_stream(messages, filename), mimetype='text/event-stream')

@app.route('/gradeEssay', methods = ['POST'])
def grade():
    data = request.get_json()
    user_id = data['user_id']
    conversation_id = data['conversation_id']
    
    data = data['prompt']
    if isinstance(data, str):
        data = json.loads(data)
            
    language = data['language']
    user_input = data
    messages, filename = grade_essay.grade(user_input, user_id, conversation_id, language)
    return Response(event_stream(messages, filename), mimetype='text/event-stream')

@app.route('/gradeEssay/rubric', methods=['POST'])
def rubric():
    data = request.get_json()
    essay_question = data["essay_question"]
    user_id = data['user_id']
    conversation_id = data['conversation_id']
    grade = data["grade"]
    language = data['language']
    essay_question = essay_question + "for grade:" + grade
    messages, filename = grade_essay.generate_rubric(essay_question, user_id, conversation_id, language)
    return Response(event_stream(messages, filename), mimetype='text/event-stream')

@app.route('/lessonComp/chat', methods = ['POST'])
def gen_questions_chat():
    """for generating more questions for the write_up with the chat"""
    data = request.get_json()
    user_id = data['user_id']
    conversation_id = data['conversation_id']

    data = data['prompt']
    content = data['content']
    user_input = data
    language = data['language']
    messages, filename = lesson_comp.generate_questions(prompt=user_input, user_id=user_id, conversation_id=conversation_id, language=language, content=content)
    return Response(event_stream(messages, filename, True), mimetype='text/event-stream')

@app.route("/lessonComp/questions", methods=['POST'])
def gen_questions():
    data = request.get_json()
    user_id = data['user_id']
    conversation_id = data['conversation_id']

    data = data['prompt']
    writeup = data["writeup"]
    qtype = data["qtype"]
    qnumber = data["qnumber"]
    language = data['language']
    notes = f"Question type: {qtype}, Number of questions: {qnumber}"
    messages, filename = lesson_comp.generate_questions(writeup, user_id, conversation_id, notes, language)
    return Response(event_stream(messages, filename), mimetype='text/event-stream')

@app.route('/mathquiz/evaluate', methods = ['POST'])
def index():
    data = request.get_json()
    user_id = data['user_id']
    conversation_id = data['conversation_id']
    user_input = data["prompt"]
    language = data['language']
    messages, filename = math_quiz.evaluate_quiz(user_input, user_id, conversation_id, language)
    return Response(event_stream(messages, filename), mimetype='text/event-stream')

@app.route("/mathquiz/gen", methods=["POST"])
def gen_quiz():
    data = request.get_json()
    conversation_id = data['conversation_id']
    user_id = data['user_id']

    data = data["prompt"]
    language = data['language']
    mathproblem = data["mathproblem"]
    multiple = data["type"]
    num = data["numberofquestions"]
    messages, filename = math_quiz.generate_quiz(mathproblem, multiple, user_id, conversation_id, language, num)
    return Response(event_stream(messages, filename), mimetype='text/event-stream')

@app.route("/mathquiz/answer", methods=["POST"])
def answers():
    data = request.get_json()
    user_id = data['user_id']
    conversation_id = data['conversation_id']
    data = data['prompt']['body']
    language = data['language']
    messages, filename = math_quiz.reveal_answers(user_id, conversation_id, language)
    return Response(event_stream(messages, filename), mimetype='text/event-stream')

@app.route('/math/lesson', methods = ['POST'])
def lesson():
    data = request.get_json()
    user_id = data['user_id']
    conversation_id = data['conversation_id']

    print(data)
    data = data['prompt']
    question = data
    language = data['language']

    messages, filename, links = math_lesson.plan_lessons_chat(question, user_id, conversation_id, language)
    return Response(event_stream(messages, filename, links), mimetype='text/event-stream')

@app.route('/video/summarize', methods = ['POST'])
def summarizevid():
    data = request.get_json()
    print('Recieved Data: ', data)
    user_id = data['user_id']
    conversation_id = data['conversation_id']

    data = data['prompt']
    url =  data['url']
    userinput = data['userinput']
    language = data['language']
    messages, filename = ytgpt.summarize(url, user_id, conversation_id, userinput, language)
    return Response(event_stream(messages, filename), mimetype='text/event-stream')

@app.route('/video/quiz', methods = ['POST'])
def videoquiz():
    data = request.get_json()
    print('Recieved Data: ', data)
    user_id = data['user_id']
    conversation_id = data['conversation_id']
    
    data = data['prompt']
    vidUrl =  data['url']
    num_questions =  data['num_question']
    quiz_type =  data['quiz_type']
    # userinput = data['userinput']
    language = data['language']

    messages, filename = ytgpt.get_quiz(vidUrl, user_id, conversation_id, num_questions, quiz_type, language)
    return Response(event_stream(messages, filename, True), mimetype='text/event-stream')

@app.route('/video/chat', methods = ['POST'])
def videochat():
    data = request.get_json()
    print('Recieved Data: ', data)
    user_id = data['user_id']   
    data = data['prompt']
    vidUrl =  data['url']
    language = data['language']
    #conversation_id = data['conversation_id']
    prompt = data['videoChatPrompt']
    messages, filename =  ytgpt.chatyoutube(vidUrl, user_id, prompt, language)
    return Response(event_stream(messages, filename, True), mimetype='text/event-stream')

@app.route('/detectai', methods = ['POST'])
def aidetect():
  data = request.get_json()
  print('Recieved Data: ', data)
  data = data['prompt']
  text = data['text']
  res = {}
  res['result'] = detect_ai(text)
  return jsonify(res), 200

@app.route('/checkplag', methods = ['POST'])
def plagiarism():
  data = request.get_json()
  print('Recieved Data: ', data)
  data = data['prompt']
  text = data['text']

  res = {}
  res['report'] = get_plag_report(text)
  return jsonify(res), 200

@app.route('/powerpoint', methods = ['POST'])
def powerpoint():
    data = request.get_json()
    print('Recieved Data: ', data)
    user_id =  data['user_id']

    description = data['prompt']['description']
    presenter = data['prompt']['presenter']
    title = data['prompt']['title']
    number_of_slides = data['prompt']['number_of_slides']
    insert_image = data['prompt']['insert_image']
    isImage = True
    language = data['prompt']['language']
    
    res = {}
    file_path = aipresentation.get_presentation(description, user_id, title, presenter, number_of_slides, insert_image, isImage, language)
    res['presentation_link'] = f"http://localhost:4000/{file_path}"
    return jsonify(res), 200

@app.route('/GeneratedPresentations/<path:path>')
def send_generated_image(path):
    return send_file(f'GeneratedPresentations/{path}', as_attachment=True)

@app.route('/chattitles', methods = ['POST'])
def title():
    data = request.get_json()
    print('Recieved Data: ', data)
    user_id = data['user_id']
    conversation_id = data['conversation_id']
    res = {}
    res['title'] = get_title(user_id, conversation_id)
    return jsonify(res), 200

@app.route('/report/answer', methods=['POST'])
def generateReport():
    body = request.get_json()
    print(body['prompt'])
    user_id = body['user_id']
    conversation_id = body['conversation_id']
    try:
        response = Response(genReport(body['prompt'], user_id, conversation_id), mimetype='text/event-stream')
        response.headers.add('Access-Control-Allow-Origin', '*')
    except Exception as ex:
        print("Can't bring data from openai server!")
        return 'Sorry. please ask me again after one minutes'
    return response

@app.route('/esl/answer', methods=['POST'])
def generateESL():
    body = request.get_json()
    print(body['prompt'])
    user_id = body['user_id']
    conversation_id = body['conversation_id']
    try:
        response = Response(genESLActivity(body['prompt'], user_id, conversation_id), mimetype='text/event-stream')
        response.headers.add('Access-Control-Allow-Origin', '*')
    except Exception as ex:
        print("Can't bring data from openai server!")
        return 'Sorry. please ask me again after one minutes'
    return response

@app.route('/docurl/quiz', methods=['POST'])
def generateGenQuizFromFile():
    # Check if the 'file' key is in the request.files dictionary
    body = request.get_json()
    user_id = body['user_id']
    conversation_id = body['conversation_id']
    print('user_id: ', user_id, '        conversation_id: ', conversation_id)
    data = body['payload']
    text = ''
    if 'url' in data:
        url = data['url']
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Chrome(options=options)
        driver.get(url) #https://app.intotheblock.com/category/all?end_offset=20
        driver.implicitly_wait(20)
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        text = soup.get_text()
        # browser = mechanicalsoup.StatefulBrowser()
        # browser.open(url)
        # text = browser.page
        text = str(text)
        text = text[: 10000]
        tokens = text.split(' ')
        if len(tokens) > 4000:
            text = " ".join(tokens[: 4000])
    else:
        if 'filename' not in body:
            body = request.get_json()
            data = body['payload']
            text = data['text']
        else:
            uploaded_file = body['filename']
            body = request.get_json()
            data = body['payload']
            if uploaded_file:
                if uploaded_file.endswith(".docx"):
                    doc = Document(uploaded_file)
                    for paragraph in doc.paragraphs:
                        text = text + paragraph.text
                elif uploaded_file.endswith(".pptx"):
                    presentation = Presentation(uploaded_file)
                    # Process the PowerPoint presentation
                    for slide in presentation.slides:
                        for shape in slide.shapes:
                            if hasattr(shape, "text"):
                                text += shape.text
        if len(text) > 90000:
            return jsonify({'msg': 'error!'}), 404
    try:
        response = Response(genQuizFromFile(data, text, user_id, conversation_id), mimetype='text/event-stream')
        response.headers.add('Access-Control-Allow-Origin', '*')
    except Exception as ex:
        print("Can't bring data from openai server!")
        return 'Sorry. please ask me again after one minutes'
    return response

@app.route('/quiz/analyze', methods=['POST'])
def generateAddtionalAnswer_1():
    body = request.get_json()
    user_id = body['user_id']
    conversation_id = body['conversation_id']
    question = body['prompt']['prompt']
    oldAnswer = body['prompt']['original'][0]['answer']
    language = body['prompt']['language']
    print(question)
    # oldAnswer = body['realAnswer']
    try:
        response = Response(genAdditionalAns(question=question, oldAnswer=oldAnswer, language=language), mimetype='text/event-stream')
        response.headers.add('Access-Control-Allow-Origin', '*')
    except Exception as ex:
        print("Can't bring data from openai server!")
        return 'Sorry. please ask me again after one minutes'
    return response

@app.route('/translate', methods=['POST'])
def translateWithGoogle():
    body = request.get_json()
    lang = body['currentLang']
    text = body['answer']
    result = []
    print(text)
    for item in text:
        subrlt = {}
        for key in item.keys():
            trans = tl.translate_text(item[key], 'google', to_language=lang)
            rlt = { key: trans }
            subrlt = { **subrlt, **rlt }
        result.append(subrlt)
    print('====================== result =======================')
    print(result)
    print('lang to: ', lang)
    return jsonify({'text': result})

@app.route('/homework/creator', methods=['POST'])
def createHomework():
    body = request.get_json()
    print(body['prompt'])
    user_id = body['user_id']
    conversation_id = body['conversation_id']
    try:
        response = Response(creHomework(body['prompt'], user_id, conversation_id), mimetype='text/event-stream')
        response.headers.add('Access-Control-Allow-Origin', '*')
    except Exception as ex:
        print("Can't bring data from openai server!")
        return 'Sorry. please ask me again after one minutes'
    return response

@app.route('/test/creator', methods=['POST'])
def creTest():
    body = request.get_json()
    print(body['prompt'])
    user_id = body['user_id']
    conversation_id = body['conversation_id']
    try:
        response = Response(createTest(body['prompt'], user_id, conversation_id), mimetype='text/event-stream')
        response.headers.add('Access-Control-Allow-Origin', '*')
    except Exception as ex:
        print("Can't bring data from openai server!")
        return 'Sorry. please ask me again after one minutes'
    return response

@app.route('/icebreaker/ideas', methods=['POST'])
def icebreakerIdeas():
    body = request.get_json()
    user_id = body['user_id']
    conversation_id = body['conversation_id']
    try:
        response = Response(icebreaker_Ideas(body['prompt'], user_id, conversation_id), mimetype='text/event-stream')
        response.headers.add('Access-Control-Allow-Origin', '*')
    except Exception as ex:
        print("Can't bring data from openai server!")
        return 'Sorry. please ask me again after one minutes'
    return response

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port='5000')
