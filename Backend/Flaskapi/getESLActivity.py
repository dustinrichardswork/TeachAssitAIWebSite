import openai
import config
import os
import json
from gptutils import create_chat_data

openai.api_key = config.DevelopmentConfig.OPENAI_KEY

history = []

def genESLActivity(data, user_id, conversation_id):
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
            You are a quiz generator. I will give you some information about examination, then you should generate different quiz problems and answers based on these information.

            Difficulty level: {level}
            Language Components: {component}
            Activity Type: {type}
            User Prompt: {prompt}
            Activity Format: {format}
            Activity Length: {len}
            Language: {language}

            Based on these information, your answer should be as follow format:
            problem number, problem
            answer

            The answer has several candidates and only the one candidate should be correct and others are incorrect.

            In case of the Acitivity Format is comprehension, you should generate a short story 2-3 paragraphs and then provide language component questions based on the story. For instance, if you're focusing on the language component of verbs, you can inquire about the number of verbs used in the story. 
            The problems should be different type.
            And the language of your response should be {language}.
    """.format(level = data['diff_level'], component = data['lang_comp'], type = data['act_type'], prompt = data['user_prompt'], format = data['act_format'], len = data['act_len'], language = data['lang'])

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