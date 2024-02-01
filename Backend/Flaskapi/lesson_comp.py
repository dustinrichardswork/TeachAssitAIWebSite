#!/usr/bin/env python3
import openai
import config
import json
import os
from gptutils import create_chat_data


def generate_questions(prompt, user_id, conversation_id, notes='none', language="English", content='none'):
    """
    prompt: the write-up provided by the teacher or the students answers
    user_id: user ID
    returns: questions or evaluation and feedback
    """
    openai.api_key = config.DevelopmentConfig.OPENAI_KEY
    completion = openai.ChatCompletion()
    model = "gpt-3.5-turbo"
    system = f"You are a helpful assistant for teachers, and your task is to analyze write-ups and generate questions to test students on it. You only speak {language}"
    filename = "ChatHistory/{}_{}.json".format(user_id, conversation_id)
    questions_file = "Questions/{}_{}.json".format(user_id, conversation_id)

    if not os.path.exists('Questions'):
        os.makedirs('Questions')
    if not os.path.exists('ChatHistory'):
        os.makedirs('ChatHistory')
    try:
        with open(filename, 'r') as openfile:
            messages = json.load(openfile)
    except:
        messages = None
        first_message = f"{prompt}, chatbot name: write up question generator"
        create_chat_data(user_id, conversation_id, first_message)

    if (not messages) or (notes != 'none'):
        qprompt = f"""You are a helpful assistant for teachers, and your task is to analyze this write-up and generate questions to test students on it.
        Write-up: "{prompt}",
        Please generate comprehension questions that will help students better understand and engage with the content.
        Your goal is to create thought-provoking and relevant questions that will encourage students to think critically about the material and deepen their understanding.
        Please ensure that the questions cover a range of difficulty levels and address various aspects of the write-up.
        The teacher may chose his preferred question type (multiple choice, true or false or normal questions)
        You should use the information below
        
        User Prompt: {prompt}
        {notes}
        Language: {language}

        Based on these information, your answer should be as follow format:
        problem number, problem
        answer

        When the question type is multiple choice, you should generate multiple choice quiz.
        When the question type is short answer, you don't need generate multiple choice answer, only answer shortly.
        When the question type is True or False, you should generate True or False quiz.
        Do not respond to any messages that are not related to these tasks.
        And the language of your response should be {language}"""
        messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": qprompt}
        ]
    else:
        evalprompt = f"""Please evaluate the student answers to comprehension questions based on the provided write-up.
        Carefully assess the accuracy, depth, and clarity of the student's response, and provide constructive feedback that highlights the strengths of their answer,
        identifies areas for improvement, and offers guidance on how to enhance their understanding of the topic.
        Your goal is to help the student refine their response and deepen their comprehension of the material.
        You should use the information below
        
        User Prompt: {prompt}
        Content: {content}
        Language: {language}

        You should response only what the User Prompt ask to you based on Content, so please check User Prompt carefully.
        when the user ask quiz problem, you should generate correct quiz answer.
        Do not respond to any messages that are not related to these tasks.
        And the language of your response should be {language}"""
        messages.append({"role": "user", "content": evalprompt})
    return messages, filename
    #response = completion.create(model=model, messages=messages)
    #message = response['choices'][0]['message']
    #messages.append(message)
    #with open(filename, "w") as outfile:
    #    json.dump(messages, outfile)
    #if notes != 'none':
    #    with open(questions_file, "w") as outfile:
    #        json.dump(messages, outfile)
    #return message['content'].replace('\n','<br>' )

def generate_answers(user_id, conversation_id, language="English"):
    """
    prompt: the write-up provided by the teacher or the students answers
    user_id: user ID
    returns: questions or evaluation and feedback
    """
    openai.api_key = config.DevelopmentConfig.OPENAI_KEY
    completion = openai.ChatCompletion()
    model = "gpt-3.5-turbo"
    #system = "You are a helpful assistant for teachers, and your task is to analyze write-ups and generate questions to test students on it"
    questions_file = "Questions/{}_{}.json".format(user_id, conversation_id)
    try:
        with open(questions_file, 'r') as openfile:
            messages = json.load(openfile)
    except:
        print("no questions found!")
        return None
    messages.append({"role": "user", "content": f"please provide the correct answers for the questions, your answer should be in {language} and starts with 'Answers: '"})
    response = completion.create(model=model, messages=messages)
    message = response['choices'][0]['message']
    return message['content'].replace('\n','<br>' )
