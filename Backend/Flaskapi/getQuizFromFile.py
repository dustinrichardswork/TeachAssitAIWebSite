import openai
import config
import os
import json
from gptutils import create_chat_data

openai.api_key = config.DevelopmentConfig.OPENAI_KEY

history = []

def genQuizFromFile(data, text, user_id, conversation_id):
    filename = "ChatHistory/{}_{}.json".format(user_id, conversation_id)

    if not os.path.exists('ChatHistory'):
        os.makedirs('ChatHistory')
    try:
        with open(filename, 'r') as openfile:
            json.load(openfile)
    except:
        first_message = f"{data}, chatbot name: report generator"
        create_chat_data(user_id, conversation_id, first_message)
    if len(text) == 0:
        text = 'empty'
    message = """
            You are a quiz generator. I will give you some information for generating quiz, then you should generate different quiz problems and answers based on these information.
            You should respond with less than 4000 tokens.

            Number of questions: {numOfQuestion}
            Quiz Type: {quizType}
            Document: '{reference}'
            Language: {language}

            Based on these information, your answer should be as follow format:
            problem number, problem
            answer

            If content of Document is empty, all you have to do is response with 'Your document is empty. Please check your upload file.'.
            Otherwise, the answer has several candidates and only the one candidate should be correct and others are incorrect.
            And You should also generate only {numOfQuestion} problems

            In case of the Quiz Type is True or False, you should only generate a quiz that answer should be true or false.
            In case of the Quiz Type is Multi-choice, you should only generate a quiz that has several questions and only on answer.
            In case of the Quiz Type is Short Answer, you should only generate a quiz that has short answer question, it means that you don't need generate multiple choice answer, only answer shortly.
            
            And the response is written by language - {language}.
    """.format(numOfQuestion = data['question_len'], quizType = data['question_type'], reference = text, language = data['lang'])
    # print("question: ", message)
    messages = [{'role': 'user', 'content': message}]
    completion = openai.ChatCompletion.create(
        model='gpt-3.5-turbo-16k-0613',
        messages=messages,
        stream = True,
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