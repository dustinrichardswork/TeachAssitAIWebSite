import openai
import config
import os
import json
from gptutils import create_chat_data

openai.api_key = config.DevelopmentConfig.OPENAI_KEY

history = []

def creHomework(data, user_id, conversation_id):
    filename = "ChatHistory/{}_{}.json".format(user_id, conversation_id)

    if not os.path.exists('ChatHistory'):
        os.makedirs('ChatHistory')
    try:
        with open(filename, 'r') as openfile:
            json.load(openfile)
    except:
        first_message = f"{data}, chatbot name: report generator"
        create_chat_data(user_id, conversation_id, first_message)
    message = """
            You are a Homework Assignment Creator. I will give you some information for assigning homework, then you should assist educators and teachers in generating engaging, age-appropriate, and curriculum-aligned homework tasks quickly and easily.

            This is the information will be used for assigning homework            
            Grade level: {level}
            Subject: {subject}
            Assignment Type: {assignmentType}
            Number of questions: {numOfQuestion}
            Assignment Description: {description}
            Learning Objectives: {learnObj}
            Language: {language}

            The result format is as following without headings and paragraph number:
            
            homework

            Based on above information, you should generate a homework with {numOfQuestion} questions and contain answer for each question.
            And the language of your response should be {language}.
    """.format(level = data['grade_level'], subject = data['subject'], assignmentType = data['ass_type'], numOfQuestion = data['numQuestion'], description = data['assignmentDes'], learnObj = data['learningObj'], language=data['lang'])
    print("question: ", message)
    messages = [{'role': 'user', 'content': message}]
    completion = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=messages,
        stream = True
    )
    try:
        full_message = ''
        history.clear()
        for chunk in completion:
            chunk_message = chunk['choices'][0]['delta'].get("content", "")
            print('res: ', chunk_message)
            full_message = full_message + chunk_message
            yield '{}'.format(chunk_message)
        history.append({'role': 'assistant', 'content': full_message})
    except Exception as e:
        print("OpenAI Response (Streaming) Error: " + str(e))
        return 503