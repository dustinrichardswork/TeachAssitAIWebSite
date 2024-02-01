import openai
import config
import os
import json
from gptutils import create_chat_data

openai.api_key = config.DevelopmentConfig.OPENAI_KEY

history = []

def createTest(data, user_id, conversation_id):
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
            You are a test creator. I will give you some information for creating test, then you should assist users, typically educators or administrators, in creating customized tests from a given information.
            This report can cover various aspects, such as student performance, attendance, assessment results, or any data relevant to the user's needs.

            This is the information will be used for creating test            
            Grade level: {level}
            Subject: {subject}
            Test Name: {test_name}
            Test Instructions (Any specific instructions or guidelines for test takers) : {test_instruction}
            Key Testing goal/s (specify in what you are testing): {key_testing_goals}
            Language: {language}

            Here, test instructions are some specific instructions or guidelines for test takers and key test goals are the direction or purpose what you are testing.

            Based on these information, your answer should be as follow format:
            number, type of question
            question
            answer

            The answer has several candidates and only the one candidate should be correct and others are incorrect.

            Based on above information, you should create {numOfMulti} of multiple-choice questions and {numOfShort} of short answer questions 
            and {numOfEssay} of essay questions.
            So, the total number of questions should be the sum of {numOfMulti},  {numOfShort} and {numOfEssay}.
            
            When the question is short answer question, you should provide only one correct answer, not multi-choice.
            When the question is essay question, you should show sample answer at least 1.
            And the language of your response should be {language}.
    """.format(level = data['grade_level'], subject = data['subject'], test_name = data['test_name'], test_instruction = data['testInstruction'], key_testing_goals = data['goal'], numOfMulti = data['numMulti'], numOfShort = data['numShort'], numOfEssay = data['numEssay'], language=data['lang'])

    print("question: ", message)
    messages = [{'role': 'user', 'content': message}]
    completion = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=messages,
        stream = True
    )
    try:
        full_message = ''
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