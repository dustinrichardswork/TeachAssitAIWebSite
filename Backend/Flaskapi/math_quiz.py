#!/usr/bin/env python3
import config
import json
from langchain import LLMMathChain, OpenAI
import ast
#from googlesearch import search
import openai
import os
from gptutils import create_chat_data

def answer_math(question):
    openai_api_key = config.DevelopmentConfig.OPENAI_KEY
    llm = OpenAI(openai_api_key=openai_api_key, temperature=0)
    llm_math = LLMMathChain.from_llm(llm)
    answer = llm_math.run(question)
    return answer

def answer_math_quiz(quiz):
    openai.api_key = config.DevelopmentConfig.OPENAI_KEY
    completion = openai.ChatCompletion()
    model = "gpt-3.5-turbo"
    system = "You are a helpful assistant for teachers, designed to check quizzes"
    messages = None
    prompt= f"""this is a math quiz : ""   {quiz}  ""
    check if there are question that can be answered with a computer and extract them in a python list, only include question that can translated into a expression that can be executed using Python's numexpr library., do not include 'solve the equation' or questions that ask for a definition, only questions with a valid numerical expression  like a simple multiplication.
    example Questions: "What is 37593 * 67?" can be translated to: numexpr.evaluate("37593 * 67")
    "what is 37593^(1/5)?" can be translated to: numexpr.evaluate("37593**(1/5)") 
    "What is the quotient of 567 divided by 9?"
    desired output format is: ["question","question","question","question"]
    output: """
    messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ]
    response = completion.create(model=model, messages=messages)
    message = response['choices'][0]['message']
    try:
        questions = ast.literal_eval(message['content'])
        answers = "Answers: \n"
        answer = []
        result = []
        index = 1
        for j in questions:
            try:
                answer = answer_math(j)
            except Exception as f:
                print(f)
                answer = "No answer"
            answers += "Question: " + j + " : " + answer + "\n"
            result.append(f"Anser {index}:\n{answer}\n\n")
            index = index + 1
        print("result: ", result)
        return answers
    except Exception as e:
        print(e)
        return "None"

def reveal_answers(user_id, conversation_id, language="English", fromfunc=False):
    openai.api_key = config.DevelopmentConfig.OPENAI_KEY
    completion = openai.ChatCompletion()
    model = "gpt-3.5-turbo"
    system = f"You are a helpful assistant for teachers, designed to rewrite quizz answers. you only speak {language}"
    quizfilename = "ChatHistory/{}_{}.json".format(user_id, conversation_id)
    try:
        with open(quizfilename, 'r') as file:
            quiz = file.read()
    except:
        print("no quiz found!")
        return "no quiz found!"
    answers = answer_math_quiz(quiz)
    print(answers)

    prompt = f"""
You will receive a quiz without solutions, along with answers to some of the questions. Your task is to rewrite the entire quiz, including its solutions, in the same format as the original quiz.
The full quiz:
{quiz}
The answers to some of the questions:
{answers}
If the quiz is multiple choice and the correct answer is not included in the quiz's answer choices, you should correct the answer choices in the quiz. However, do not indicate that a correction has been made.
If the quiz is true or false, the answers can only be true or false, if the answer provided contains a numerical value change it to a true or false.
Your response Begin with the phrase "Here are the answers to your quiz:".
you only speak {language}"""
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt}]
    if fromfunc == False:
        return messages, quizfilename
    response = completion.create(model=model, messages=messages)
    message = response['choices'][0]['message']
    all_answers = message['content']
    return all_answers

def evaluate_quiz(prompt, user_id, conversation_id, language="English"):
    openai.api_key = config.DevelopmentConfig.OPENAI_KEY
    completion = openai.ChatCompletion()
    model = "gpt-3.5-turbo"
    system = f"You are a helpful assistant for teachers, designed to evaluate quizzes.you only speak {language}"
    messages = None
    filename = "ChatHistory/{}_{}.json".format(user_id, conversation_id)

    if not os.path.exists('ChatHistory'):
        os.makedirs('ChatHistory')
    try:
        with open(filename, 'r') as openfile:
            messages = json.load(openfile)
    except:
        messages = None
        first_message = f"{prompt}, chatbot name: quiz evaluating bot"
        create_chat_data(user_id, conversation_id, first_message)

    answers = reveal_answers(user_id, conversation_id, language, fromfunc=True)
    if answers == "None":
        return "I'm sorry but I can't evaluate the answers correctly"
    final_prompt = f"""this is a solution to a math quiz: ""   {answers}  ""
    these are the student's answer {prompt}
    the student may have answered questions that you don't have, when that happen say that you can't evaluate that answer because you don't have an answer.
    evaluate the student's answers and provide a constructive feedback,
    only evaluate with the correct answers provided.
    Do not respond if the student's answers are not related to evaluating the quiz.
    if the student's answers are not understandable or none reply with:
    'I am sorry, but I cannot evaluate the student's answer as it does not provide clear answer choices for each question.'
    you only speak {language}"""
    if not messages:
        messages = [
            {"role": "system", "content": system},
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

def generate_quiz(math_problem, multiple, user_id, conversation_id, language, number):
    """
    math_problem: math_problem by user
    user_id: user ID
    returns: Quiz
    """
    openai.api_key = config.DevelopmentConfig.OPENAI_KEY
    completion = openai.ChatCompletion()
    model = "gpt-3.5-turbo"
    system = f"You are a helpful assistant for teachers, designed to generate math quizzes based on a math problem. you only speak {language}. you only reply with the quiz, you do not add any notices or warnings"
    messages = None
    filename = "ChatHistory/{}_{}.json".format(user_id, conversation_id)

    if not os.path.exists('ChatHistory'):
        os.makedirs('ChatHistory')
    if not os.path.exists('Quizzes'):
        os.makedirs('Quizzes')
    quizfilename = "Quizzes/{}_{}.txt".format(user_id, conversation_id)

    add_str = ""
    
    multiple_str = str(multiple)
    
    if multiple_str == "multiple choice":
        add_str = "the quiz questions should be multiple choice questions. Multiple choice questions should show only 3 options."
    elif multiple_str == "true/false and multiple choice":
        add_str = "the quiz questions should be a mix of both true/ false questions, and multiple choice questions. Multiple choice questions should show only 3 options."

    try:
        with open(filename, 'r') as openfile:
            messages = json.load(openfile)
    except:
        messages = None
        first_message = f"{math_problem}, chatbot name: math quiz generator"
        create_chat_data(user_id, conversation_id, first_message)

    final_prompt = f"""Your role as a teacher's assistant is to create a math quiz based on a theme provided by the teacher. The quiz should only include math problems that can be converted into an expression compatible with calculators.
For example, questions like "What is 37593 * 67?" or "What is 37593^(1/5)?" are acceptable. However, avoid complex questions such as simplifying an expression or solving an equation.
Your responses should strictly pertain to your task of generating math quizzes. Do not engage in discussions or tasks outside this scope.
If the message does not relate to a math theme, do not respond.
Ensure that each question in the quiz is self-contained, providing all the necessary information for the student to answer.
The questions should be {multiple_str}
Do not provide the answers within the quiz.
Begin the quiz with the phrase "Here is your quiz", add title of the quiz wich is the theme name ({math_problem}), followed by the quiz type ({multiple_str})
When the quiz type is multiple choice, you should generate multiple choice quiz.
When the quiz type is short answer, you don't need generate multiple choice answer, only answer shortly.
When the quiz type is true or false, you should generate true or false quiz.
you only speak {language}
The number of questions should be {number}
"""
    followup_prompt = math_problem

    if not messages:
        messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": final_prompt+ add_str + "start with Here is your quiz"}
        ]
    else:
        messages.append({"role": "user", "content": followup_prompt})

    return messages, filename
    #response = completion.create(model=model, messages=messages)
    #message = response['choices'][0]['message']
    #messages.append(message)
    #with open(filename, "w") as outfile:
    #    json.dump(messages, outfile)
    #with open(quizfilename, "w") as f:
    #    f.write(message['content'])
    #return message['content'].replace('\n','<br>' )
