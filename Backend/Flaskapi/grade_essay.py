#!/usr/bin/env python3
import openai
import config
import json
import os
from gptutils import create_chat_data


def generate_rubric(question, user_id, conversation_id, language="English"):
    """
    question: essay question
    user_id: user ID
    returns: grading cubric
    """
    openai.api_key = config.DevelopmentConfig.OPENAI_KEY
    completion = openai.ChatCompletion()
    model = "gpt-3.5-turbo"
    system = f"You are a helpful assistant for teachers, designed to generate grading cubric based on an essay question. And the language of your response should be {language}"
    filename = "Cubrics/{}_{}.json".format(user_id, conversation_id)
    if not os.path.exists('Cubrics'):
        os.makedirs('Cubrics')
    essay = f"""Given the essay question: "{question}", your task is to create a detailed marking rubric that can be used to grade an essay written in response to this question. The rubric should include clear criteria, point allocations, and descriptions for each level of performance. Ensure that the rubric is comprehensive and covers all aspects of a well-written essay, such as content, organization, language, and mechanics. The point distribution is as follows:
Content: 40 points
Organization: 20 points
Language: 20 points
Mechanics: 20 points Total: 100 points
Please focus solely on generating rubrics and grading essays based on the provided criteria. Do not respond to any messages that are not related to these tasks.
And the language of your response should be {language}.
"""
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": essay}
    ]
    return messages, filename
    #response = completion.create(model=model, messages=messages)
    #message = response['choices'][0]['message']
    #with open(filename, "w") as outfile:
    #    json.dump(message, outfile)
    #return message['content'].replace('\n','<br>' )

def grade(essay, user_id, conversation_id, language="English"):
    """
    essay: essay by user
    user_id: user ID
    returns: Quiz
    """
    openai.api_key = config.DevelopmentConfig.OPENAI_KEY
    completion = openai.ChatCompletion()
    model = "gpt-3.5-turbo"
    system = f"You are a helpful assistant for teachers tasked with grading student essays based on a provided marking rubric. And the language of your response should be {language}"
    messages = None
    filename = "ChatHistory/{}_{}.json".format(user_id, conversation_id)
    cubricfile = "Cubrics/{}_{}.json".format(user_id, conversation_id)

    if not os.path.exists('ChatHistory'):
        os.makedirs('ChatHistory')
    try:
        with open(cubricfile, 'r') as openfile:
            rubric = json.load(openfile)
    except:
        rubric = f"""
Content (40 points)
Exemplary (36-40 points): The essay demonstrates a thorough understanding of the topic. The arguments are clear, well-supported with relevant evidence, and directly related to the thesis. The essay shows original thinking and creativity.
Proficient (31-35 points): The essay demonstrates a good understanding of the topic. The arguments are clear and mostly supported by evidence. There is a connection to the thesis.
Developing (21-30 points): The essay demonstrates some understanding of the topic. The arguments are not always clear or well-supported by evidence. The connection to the thesis is weak.
Beginning (0-20 points): The essay demonstrates little or no understanding of the topic. The arguments are unclear and unsupported by evidence. There is no clear thesis.
Organization (20 points)
Exemplary (18-20 points): The essay is well-organized with a clear introduction, body, and conclusion. Transitions between ideas are smooth, and each paragraph supports the thesis.
Proficient (15-17 points): The essay is mostly well-organized. There may be some abrupt transitions, and not all paragraphs support the thesis.
Developing (10-14 points): The essay is somewhat disorganized. Transitions are often abrupt or non-existent, and many paragraphs do not support the thesis.
Beginning (0-9 points): The essay is disorganized. There are no clear transitions, and the paragraphs do not support the thesis.
Language (20 points)
Exemplary (18-20 points): The essay uses clear, concise, and sophisticated language. Sentences are varied, and vocabulary is appropriate and varied.
Proficient (15-17 points): The essay uses clear and concise language with some sentence variety. Vocabulary is appropriate.
Developing (10-14 points): The essay uses language that is sometimes unclear or inappropriate. There is little sentence variety, and vocabulary is simplistic.
Beginning (0-9 points): The essay uses language that is often unclear or inappropriate. There is no sentence variety, and vocabulary is inappropriate or inaccurate.
Mechanics (20 points)
Exemplary (18-20 points): The essay is free of grammatical, spelling, and punctuation errors. The format is correct according to the specified style guide (e.g., APA, MLA).
Proficient (15-17 points): The essay has few grammatical, spelling, or punctuation errors. There may be minor format errors.
Developing (10-14 points): The essay has several grammatical, spelling, or punctuation errors that distract from the content. There are several format errors.
Beginning (0-9 points): The essay is full of grammatical, spelling, or punctuation errors that make the content difficult to understand. The format is incorrect.
And the language of your response should be {language}"""
    try:
        with open(filename, 'r') as openfile:
            messages = json.load(openfile)
    except:
        messages = None
        first_message = f"{essay}, chatbot name: Grading essays"
        create_chat_data(user_id, conversation_id, first_message)

    first_prompt = f"""As a helpful assistant for teachers, You are tasked with grading student essays based on the provided marking rubric and giving feedback for improvement.
    Carefully evaluate each essay according to the rubric's criteria: {rubric}. answer with "ok" if you understand"""
    final_prompt = f"""
    given this student essay:"" {essay} ""
    Carefully evaluate the essay according to the provided rubric's criterias,
    your evaluation should follow this format
    "Total score: ?/100 points
    Content: ?/40 points [explain why]
    Organization: ?/20 points [explain why]
    Language: ?/20 points [explain why]
    Mechanics: ?/20 points [explain why]
    Feedback: [specific constructive feedback]"
    Provide specific and constructive feedback to help the students improve their writing skills. Do not engage in any discussions or answer any questions unrelated to your task of grading essays and providing feedback.
    And the language of your response should be {language}
    """

    if not messages:
        messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": first_prompt},
            {"role": "assistant", "content": "ok"},
            {"role": "user", "content": final_prompt}
        ]
    else:
        messages.append({"role": "user", "content": final_prompt})

    return messages, filename
    #response = completion.create(model=model, messages=messages)
    #message = response['choices'][0]['message']
    #messages.append(message)
    #with open(filename, "w") as outfile:
    #    json.dump(messages, outfile)
    #return message['content'].replace('\n','<br>' )
