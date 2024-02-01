## API Endpoints

### Lesson Planning Bot
**Endpoint:** `/lessonplanner`
**Method:** `POST`
**Description:** This endpoint generates lesson plans and enables chat.
**Payload:** 
```json
{
  "prompt": "<lesson_topic>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>"
}
```

### General Quiz Bot
**Endpoint:** `/quiz`
**Method:** `POST`
**Description:** This endpoint generates a quiz based on the provided parameters.
**Payload:** 
```json
{
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
  "grade": "<grade_level>",
  "topic": "<quiz_topic>",
  "subject": "<quiz_subject>",
  "summary": "<quiz_summary>",
  "type": "<quiz_type>",
  "questionnumber": "<number_of_questions>"
}
```

### Automated Essay Scoring and Feedback Bot
**Endpoint:** `/gradeEssay`
**Method:** `POST`
**Description:** This endpoint grades an essay based on the provided essay text.
**Payload:** 
```json
{
  "prompt": "<essay_text>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>"
}
```

**Endpoint:** `/gradeEssay/rubric`
**Method:** `POST`
**Description:** This endpoint generates a rubric for the essay.
**Payload:** 
```json
{
  "essay_question": "<essay_question>",
  "grade": "<grade_level>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>"
}
```

### Comprehension Lesson Generator Bot
**Endpoint:** `/lessonComp/questions`
**Method:** `POST`
**Description:** This endpoint generates questions for a write-up.
**Payload:** 
```json
{
  "writeup": "<text_of_writeup>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
  "type": "<question_type>",
  "qnumber": "<number_of_questions>"
}
```

**Endpoint:** `/lessonComp/chat`
**Method:** `POST`
**Description:** This endpoint generates more questions for the write-up through chat.
**Payload:** 
```json
{
  "prompt": "<chat_message>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>"
}
```

**Endpoint:** `/lessonComp/answer`
**Method:** `POST`
**Description:** This endpoint reveals the answers.
**Payload:** 
```json
{
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>"
}
```

### Maths Quiz Bot
**Endpoint:** `/mathquiz/gen`
**Method:** `POST`
**Description:** This endpoint generates a math quiz.
**Payload:** 
```json
{
  "mathproblem": "<math_problem>",
  "type": "<quiz_type>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
}
```

**Endpoint:** `/mathquiz/evaluate`
**Method:** `POST`
**Description:** This endpoint evaluates the quiz and enables chat.
**Payload:** 
```json
{
  "prompt": "<answers_or_chat_message>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
}
```

**Endpoint:** `/mathquiz/answer`
**Method:** `POST`
**Description:** This endpoint reveals the answers for the quiz.
**Payload:** 
```json
{
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
}
```

### Maths Lesson Planner Bot
**Endpoint:** `/math/lesson`
**Method:** `POST`
**Description:** This endpoint generates a math lesson plan and enables chat.
**Payload:** 
```json
{
  "prompt": "<lesson_topic>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
}
```

### Video to Note Summary Bot
**Endpoint:** `/video/summarize`
**Method:** `POST`
**Description:** This endpoint summarizes a YouTube video from a link.
**Payload:** 
```json
{
  "url": "<youtube_video_url>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
}
```

**Endpoint:** `/video/chat`
**Method:** `POST`
**Description:** This endpoint enables chat after generating the summary.
**Payload:** 
```json
{
  "url": "<youtube_video_url>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
  "prompt": "<chat_message>"
}
```

### Video to Quiz Bot
**Endpoint:** `/video/quiz`
**Method:** `POST`
**Description:** This endpoint generates a quiz based on a YouTube video.
**Payload:** 
```json
{
  "url": "<youtube_video_url>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
  "num_question": "<number_of_questions>",
  "quiz_type": "<quiz_type>"
}
```

**Endpoint:** `/video/answers`
**Method:** `POST`
**Description:** This endpoint reveals the answers after generating the quiz.
**Payload:** 
```json
{
  "url": "<youtube_video_url>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
}
```

**Endpoint:** `/video/chat`
**Method:** `POST`
**Description:** This endpoint enables chat after generating the summary.
**Payload:** 
```json
{
  "url": "<youtube_video_url>",
  "user_id": "<user_id>",
  "conversation_id": "<conversation_id>",
  "prompt": "<chat_message>"
}
```

### Detect AI Writing Bot
**Endpoint:** `/detectai`
**Method:** `POST`
**Description:** This endpoint will detect AI writing.
**Payload:**
```json
{
  "text": "<text>"
}
```

### Detect Plagiarism Bot
**Endpoint:** `/checkplag`
**Method:** `POST`
**Description:** This endpoint will plagiarism.
**Payload:**
```json
{
  "text": "<text>"
}
```

### PowerPoint Presentation Bot
**Endpoint:** `/powerpoint`
**Method:** `POST`
**Description:** This endpoint generates a PowerPoint presentation.
**Payload:** 
```json
{
  "id": "<user_id>",
  "prompt": "<presentation_topic>"
}
```

### Endpoint for getting chat titles
**Endpoint:** `/chattitles`
**Method:** `POST`
**Description:** This endpoint returns a chat title from conversation id and user id, the title and date fo creation of the conversation is generated once the conversation is created and is stored in a json file "ChatData/user_id_conversation_id.json". Note: The content of the conversation is stored in a json file named "ChatHistory/user_id_conversation_id.json".
**Payload:** 
```json
{
  "id": "<user_id>",
  "conversation_id": "<conversation_id>"
}
```



Please replace `<...>` with the actual values you want to use for testing.