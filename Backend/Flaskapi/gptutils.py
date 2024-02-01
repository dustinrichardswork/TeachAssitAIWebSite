#!/usr/bin/env python3
import openai
import config
import json
import os
import datetime

openai.api_key = config.DevelopmentConfig.OPENAI_KEY

def openhistory(filename):
    try:
        with open(filename, 'r') as openfile:
            messages = json.load(openfile)
    except BaseException:
        messages = None
    return messages

def savehistory(filename, messages):
    with open(filename, "w") as outfile:
        json.dump(messages, outfile)

def aicomplete(prompt, system='none', maxtokens='none', filename='dontsave'):
    completion = openai.ChatCompletion()
    model = "gpt-4-1106-preview"
    if system == 'none':
        system = "you are a helpfull assistant"
    messages = openhistory(filename)
    if messages:
        message = {"role": "user", "content": prompt}
        messages.append(message)
        response = completion.create(model=model, messages=messages)
    else:
        messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ]
        if maxtokens == 'none':
            response = completion.create(model=model, messages=messages)
        else:
            response = completion.create(
                model=model, messages=messages, max_tokens=maxtokens)
    message = response['choices'][0]['message']
    messages.append(message)
    if filename != 'dontsave':
        savehistory(filename, messages)
    return message['content'].replace('\n', '<br>')

def aicomplete_davinci(
        prompt,
        model="text-davinci-003",
        max_tokens=None,
        temperature=1.0,
        top_p=1.0,
        n=1,
        stream=False,
        echo=False,
        stop=None,
        presence_penalty=0.0,
        frequency_penalty=0.0,
        ):
    model = "text-davinci-003"  # Change the model here
    response = openai.Completion.create(
        engine=model,
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=temperature,
        top_p=top_p,
        n=n,
        stream=stream,
        echo=echo,
        stop=stop,
        presence_penalty=presence_penalty,
        frequency_penalty=frequency_penalty,
    )
    return response.choices[0].text.strip()

def create_chat_data(user_id, conversation_id, first_message):
    # Generate conversation title
    prompt = f"you are tasked with generating titles for chatbot conversations, the titles should be concise and informative (between 3 and 6 words). first message: {first_message}, title:"
    conversation_title = aicomplete_davinci(prompt)

    # Get current time
    creation_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # Construct content file path
    content_file_path = "ChatHistory/{}_{}.json".format(user_id, conversation_id)
    # Construct chat data
    chat_data = {
        "title": conversation_title,
        "creation_time": creation_time,
        "content_file": content_file_path
    }
    # Create directory if it doesn't exist
    if not os.path.exists('ChatData'):
        os.makedirs('ChatData')
    # Write chat data to json file
    with open("ChatData/{}_{}.json".format(user_id, conversation_id), 'w') as json_file:
        json.dump(chat_data, json_file)
        print('history is created, id: ', conversation_id)

def get_title(user_id, conversation_id):
    file_path = "ChatData/{}_{}.json".format(user_id, conversation_id)
    if not os.path.exists(file_path):
        print("File does not exist.")
        return None
    with open(file_path, 'r') as json_file:
        chat_data = json.load(json_file)
    conversation_title = chat_data.get("title", None)
    return conversation_title
