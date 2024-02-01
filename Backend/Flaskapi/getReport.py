import openai
import config
import os
import json
from gptutils import create_chat_data

openai.api_key = config.DevelopmentConfig.OPENAI_KEY

history = []

def genReport(data, user_id, conversation_id):
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
            You are a report generator. I will give you some information for generating report, then you should assist users, typically educators or administrators, in generating customized reports from a given information.
            This report can cover various aspects, such as student performance, attendance, assessment results, or any data relevant to the user's needs.

            This is the information will be used for generating report            
            Grade level: {level}
            Subject: {subject}
            Student Name: {student_name}
            Gender: {gender}
            Level of performance: {levelOfPerformance}
            Areas of improvement: {areas}
            Key accomplishments: {keys}
            Number of paragraphs: {numOfParag}
            Number of characteristics: {characters}
            Language: {language}

            The result format is as following without headings and paragraph number:
            'Report'
            content
        
            Based on above information, you should generate a report with {numOfParag} paragraphs and the answer is written by language - {language}.

    """.format(level = data['grade_level'], subject = data['subject'], student_name = data['std_name'], gender = data['gender'], levelOfPerformance = data['performance'], areas = data['area_improv'], keys = data['key_accompl'], numOfParag=data['num_pg'], language=data['lang'], characters=data['num_charaters'])

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
        print('full_message: ', full_message)
        history.clear()
        history.append({'role': 'assistant', 'content': full_message})
    except Exception as e:
        print("OpenAI Response (Streaming) Error: " + str(e))
        return 503