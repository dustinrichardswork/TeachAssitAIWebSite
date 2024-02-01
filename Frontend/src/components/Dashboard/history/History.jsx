// import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import api from "../../../util/api";
import { useEffect, useState } from "react";
import Content from "./Content";


import { MdOutlineWorkHistory } from 'react-icons/md'

const History = ({ chatbot, componentRef }) => {

    // const { chatbot } = useParams();
    const [chatIDs, setChatIDs] = useState();
    const [chatID, setChatID] = useState('')

    const getChatIDs = async () => {
        try {

            const res = await api.post('/chat/get-chat-ids/', { chat_name: chatbot })
            console.log(res.data);
            setChatIDs(res.data.history)

        } catch (error) {
            console.log('Error while fetching ids: \n', error);
        }
    }


    useEffect(() => {
        getChatIDs()
    }, [])

    if (!chatIDs) {
        return <div>Loading....</div>
    }

    return (
        <div className="flex gap-5">
            <div className="flex-[1.5] flex flex-col gap-5 pl-3 max-h-[100vh] overflow-y-scroll" style={{
                overflowY: 'scroll',
                scrollbarWidth: 'none', /* For Firefox */
                WebkitOverflowScrolling: 'touch', /* For iOS Safari */
                MsOverflowStyle: '-ms-autohiding-scrollbar' /* For IE/Edge */
            }}>
                {
                    (chatIDs.length > 0) ? (
                        chatIDs.map((e) => (
                            <div onClick={() => setChatID(e.id)} className="flex flex-row gap-3 cursor-pointer border-b border-blue-500">
                                <MdOutlineWorkHistory />
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{e.title}</p>
                            </div>
                        ))
                    ) : (
                        <h3 className=" text-xl font-bold">No History</h3>
                    )
                }
            </div>
            <div className="flex-[5] max-h-[100vh]">
                <Content componentRef={componentRef} chatbotid={chatID} />
            </div>
        </div>
    );
}

export default History;