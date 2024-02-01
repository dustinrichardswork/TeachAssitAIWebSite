import api from './api';

export const createChatHistory = async (chatbot_name, answers) => {
    try {
        const res = await api.post('/chat/history', { chatbot_name, answers })
        alert("Chat history created: ")
        return res.data._id
    } catch (error) {
    
        console.log('Error While creating the chat history');
        alert('Error while Creaing Chat History')
    }
}


export const getChatHistory = async (chatbot_name, answers) => {
    try {
        const res = await api.get('/chat/history', { chatbot_name, answers })
    } catch (error) {
        console.log('Error While getting the chat history');
    }
}


export const updateeChatHistory = async (chatbot_name, answers) => {
    try {
        const res = await api.get('/chat/history', { chatbot_name, answers })
    } catch (error) {
        console.log('Error While updating the chat history');
    }
}

export const deleteChatHistory = async (chatbot_name, answers) => {
    try {
        const res = await api.get('/chat/history', { chatbot_name, answers })
    } catch (error) {
        console.log('Error While creating the chat history');
    }
}