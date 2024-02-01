import { useEffect, useState } from "react";
import api from "../../../util/api";
import Answer from "../../Chatbots/Answer";

const Content = ({ chatbotid, componentRef }) => {

    // const { chatbotid } = useParams();
    const [chatHistory, setChatHistory] = useState();

    const getHistory = async () => {
        try {

            const res = await api.get(`/chat/history/${chatbotid}`)
            console.log(res.data.history);
            setChatHistory(res.data.history)

        } catch (error) {
            console.log('Error while fetching ids: \n', error);
        }
    }


    useEffect(() => {
        console.log('\n\n\nChatID: \n\n', chatbotid);
        getHistory();
    }, [chatbotid])

    return (
        <>
            {/* <h1>Content: {chatbotid}</h1> */}
            <div style={{
                overflowY: 'scroll',
                scrollbarWidth: 'thin', /* For Firefox */
                WebkitScrollbarWidth: 'thin', /* For Firefox */
                scrollbarColor: 'rgb(23, 5, 20) #a5aeae', /* For Firefox */
                WebkitScrollbarColor: 'rgb(23, 5, 20) #a5aeae', /* For Firefox */
            }}>
                {
                    chatHistory &&
                    <div ref={componentRef}>
                        <Answer answer={chatHistory.content} />
                    </div>
                }
            </div>
        </>

    );
}

export default Content