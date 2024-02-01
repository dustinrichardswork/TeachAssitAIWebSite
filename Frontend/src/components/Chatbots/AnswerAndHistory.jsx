import React, { useContext, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Answer from './Answer';

import Loading from './Loading';
import ShortForm from './ShortForm';
import History from '../Dashboard/history/History';
import ExamplePrompts from './ExamplePrompts';
import { UsageContext } from '../../context/UsageContext';
import api from '../../util/api';
import { backend_url } from '../../util/variables';
import { toast } from 'react-toastify';

const langsItems = [
    {langKey: 'en', label: 'English' },
    {langKey: 'zh-cn', label: 'Chinese Simplified' },
    {langKey: 'fr', label: 'French' },
    {langKey: 'it', label: 'Italian' },
    {langKey: 'ru', label: 'Russian' },
    { langKey: "es", label: "Spanish" },
    { langKey: "de", label: "German" },
    { langKey: "nl", label: "Dutch" },
    { langKey: "pt", label: "Portuguese" },
    { langKey: "ja", label: "Japanese" },
    { langKey: "ko", label: "Korean" },
    { langKey: "sv", label: "Swedish" },
    { langKey: "da", label: "Danish" },
    { langKey: "no", label: "Norwegian" },
    { langKey: "pl", label: "Polish" },
    { langKey: "tr", label: "Turkish" },
    { langKey: "fi", label: "Finnish" }
]

const AnswerAndHistory = ({
    answer, setAnswer,
    original,
    componentRef,
    loading, setLoading,
    chatID, url,
    chatbot, dontFollow, examplePrompts, notPrompts,
    getAnswers,
    content,
    message
}) => {

    const [showHistory, setShowHistory] = useState(false);
    const { usage } = useContext(UsageContext)
    const [lang, setLang] = useState('en')

    const handleChange = async (event) => {
        const currentLang = event.target.value;
        setLang(currentLang)
        const data = {
            body: {
                answer: answer,
                currentLang
            },
            chat_id: chatID
        }
        setLoading(true);
        api.post(`${backend_url}/google-bot/translate`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("teachai_token")}`
            }
        }).then(res => {
            console.log(res.data.text)
            setAnswer(res.data.text)
        }).catch(err => {
            toast('Something Wrong!')
        }).finally(() => {
            setLoading(false)
        })
    };
    
    return (
        <div className='max-h-[100vh] pb-5 flex flex-1 gap-3'>
            <div className={`flex-[2] ${answer.length > 0 ? 'border-r border-black' : ''}`}>
                <div className=' border-b-2 flex gap-3'>
                    <button className={`${!showHistory ? 'bg-slate-300' : ''} px-4 py-2`} onClick={() => setShowHistory(false)}>Output</button>
                    {
                        usage?.plan === 'Professional' && (
                            <button className={`${showHistory ? 'bg-slate-300' : ''} px-4 py-2`} onClick={() => setShowHistory(true)}>History</button>
                        )
                    }
                    <div className='text-right' style={{width: '100%'}}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Translate</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={lang}
                                label="Language"
                                onChange={handleChange}
                            >
                                {
                                    langsItems.map(item => (<MenuItem value={item.langKey}>{item.label}</MenuItem>))
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {
                    !showHistory ? (
                        <>
                            {
                                (answer.length > 0) ? (
                                    <div className='relative w-full h-full'>
                                        <div className='relative w-full h-full' ref={componentRef}>

                                            {!loading && <Answer answer={answer} />}
                                            {
                                                loading && <div className='flex justify-center items-center w-full h-full relative'>
                                                    {message && loading && <h3>{message}</h3>}
                                                    <Loading />
                                                </div>
                                            }
                                            {
                                                (chatbot == 'Math Quiz Generator') && (
                                                    <div>
                                                        <button onClick={getAnswers} className='px-4 py-2 rounded-md border-2 text-white bg-[#ed7742]'>
                                                            Reveal Answers
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        {
                                            !dontFollow &&
                                            <ShortForm
                                                url={url}
                                                setLoading={setLoading}
                                                realAnswer={answer}
                                                original={original}
                                                setAnswer={setAnswer}
                                                chatID={chatID}
                                                content={content}
                                            />
                                        }
                                    </div>
                                )
                                    : (
                                        <div className=' flex justify-center items-center w-full h-full relative'>
                                            {!loading && <p>Try variety of inputs and input lengths to get the best results</p>}
                                            {message && loading && <p>{message}</p>}
                                            {
                                                loading && <Loading />
                                            }
                                        </div>
                                    )

                            }

                        </>
                    ) : (
                        <div>
                            <History componentRef={componentRef}  chatbot={chatbot} />
                        </div>
                    )
                }
            </div>

            {/* {
                !notPrompts && (
                    ((answer.length > 0) && (!showHistory)) && (window.innerWidth > 786) && <ExamplePrompts examplePrompts={examplePrompts} />
                )
            } */}

        </div>
    )
}

export default AnswerAndHistory