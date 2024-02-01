import openai
import config

openai.api_key = config.DevelopmentConfig.OPENAI_KEY


def genAdditionalAns(question, oldAnswer, language):
    history = []
    # history.append({ 'role': 'user', 'content': oldAnswer[0] })
    # history.append({ 'role': 'assistant', 'content': oldAnswer[1] })
    # message = """
    #         You are follow-up chatter, it means you should response considering old conversation history.

    #         Question: "{question}"

    #         You should analyze the question exactly, and generate response.
    #         If question is related the content of generated result or the topic of old conversation history,
    #         your response should be generated based on conversation history or question.
            
    #         But question is not related the content of old conversation history at all, your english answer should be "I'm sorry, but I'm unable to assist with that question. My role is to assist teachers and students in improving their skills. If you have any requests related to the activities, I'll be happy to help." with below format. and then translate by the language - {language}.
            
    #         Your ouput format is as following:
    #         your answer

    #         The content of Question and Answer of your entire output should be written by language - {language}

    # """.format(question=question, language=language)
    # if question is not related to the document, subject and summary, your english response should be "I'm sorry, but I'm unable to assist with that question. My role is to assist teachers and students in improving their skills. If you have any requests related to the activities, I'll be happy to help." with below format. and then translate by the language - {language}.
    # messsage = """
    #     question: "{question}"
    #     if question is not related to given topic - {oldAnswer}, your english answer should be "I'm sorry, but I'm unable to assist with that question. My role is to assist teachers and students in improving their skills. If you have any requests related to the activities, I'll be happy to help." with below format. and then translate by the language - {language}.
    #     the otherwise, your output format should be as follow:
    #     your answer

    #     Your response should be written by {language}.
    # """.format(question=question, language=language, oldAnswer=oldAnswer[1])

    # message = """
    #         "generated result": "{old_answer}"
    #         If {question} is related the content or the topic of "generated result",
    #         You should analyze the topic of generated result and {question} exactly, and generate response.
            
    #         Your output format is as following:
    #         your answer

    #         But "{question}" is not related the content or the topic of "generated result", 
    #         your response should be "I'm sorry, but I'm unable to assist with that question. 
    #         My role is to assist teachers and students in improving their skills. 
    #         If you have any requests related to the activities, I'll be happy to help".
            
    #         The content of Question and Answer of your entire output should be written by language - {language}

    # """.format(question=question, old_answer=oldAnswer, language=language)

    message = """
        generated result: {old_answer}
            If {question} is related the content of generated result or the topic of generated result,
            your response should be generated in based on generated result and {question}.
            
            But {question} is not related the content of generated result or the topic of generated result, 
            your response should be "I'm sorry, but I'm unable to assist with that question. 
            My role is to assist teachers and students in improving their skills. 
            If you have any requests related to the activities, I'll be happy to help".
            
            You should analyze the topic of generated result and {question} exactly, and generate response.

            You should also analyze the content of "{question}" exactly and generate response.
            For instance, the content of "{question}" is about add more examples, questions and so on, you should generate more examples or question in based on generated result.
            
            Your output format is as following:
            your answer

            The content of Question and Answer of your entire output should be written by language - {language}

    """.format(question=question, old_answer=oldAnswer, language=language)

    history.append({ 'role': 'user', 'content': message })
    print("question: ", history)
    completion = openai.ChatCompletion.create(
        model='gpt-4',
        messages=history,
        stream = True
    )
    # complete = completion['choices'][0]['message']['content']
    try:
        full_message = ''
        for chunk in completion:
            # collected_chunks.append(chunk)  # save the event response
            # chunk_message = chunk['choices'][0]['delta'].get("content", "")  # extract the message
            chunk_message = chunk['choices'][0]['delta'].get("content", "")

            print("asd", chunk_message)
            full_message = full_message + chunk_message
            yield '{}'.format(chunk_message)
    except Exception as e:
        print("OpenAI Response (Streaming) Error: " + str(e))
        return 503