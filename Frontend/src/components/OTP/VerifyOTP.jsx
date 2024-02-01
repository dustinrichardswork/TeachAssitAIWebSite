import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import api from '../../util/api';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {

    const navigate = useNavigate();
    const [send, setSend] = useState(1);

    const [one, setOne] = useState('')
    const [two, setTwo] = useState('')
    const [three, setThree] = useState('')
    const [four, setFour] = useState('')

    const { tempUser, getUserData, setIsAuthenticated } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let otp = one + two + three + four;


        console.log('OTP: ', otp);
        if (otp.length < 4) {
            toast('OTP is not Valid. Enter Valid OTP')
            return;
        }

        if (otp.length === 4) {
            try {
                const { data } = await api.post('/verifyOTP', { userId: tempUser.userId, otp })
                console.log('data: ', data);
                localStorage.setItem('teachai_verified_device', `${tempUser.userId}-verifyDevice`)
                toast(`${data.message}`)
                localStorage.setItem("teachai_token", data.token)
                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                
                setTimeout(() => {
                    if (tempUser?.send) {
                        getUserData();
                        setIsAuthenticated(true)
                        navigate('/user/dashboard/chatbots')
                    }
                    const plan = localStorage.getItem("plan");

                    if (plan) {
                        api.post('/payment/process', { plan })
                            .then(response => {
                                localStorage.removeItem('plan')
                                getUserData();
                                setIsAuthenticated(true)
                                window.location.href = response.data.url
                                console.log('Response:', response.data);
                            })
                            .catch(error => {
                                console.error('Error:', error.message);
                            });
                    } else {
                        getUserData();
                        setIsAuthenticated(true)
                        navigate('/user/dashboard/chatbots')
                    }
                }, 3000);
            } catch (error) {
                console.log('Error: ', error);
                toast('Error While Verifying the OTP!')
            }
        }
    }

    const resendOTP = async (e) => {
        if (e) e.preventDefault();
        try {
            console.log('sending Data: ', tempUser);
            const { data } = await api.post('/resendOTPVerificationCode', { ...tempUser })
            toast(`OTP has been Sended!`)
            console.log('Response: ', data);
        } catch (error) {
            console.log('Error: ', error);
            toast("Error While Resending OTP!")
        }

    }


    const handleOTP = (value, fn) => {
        if (value.length === 1) {
            fn(value)
        }
    }
    useEffect(() => {
        if ((tempUser?.send) && (send === 1)) {
            resendOTP()
            setSend(prev => prev + 1)
        }
    }, [])

    return (
        // <div className=' max-w-[1640px] mx-auto min-h-screen flex justify-center items-center'>
        <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div class="flex flex-col items-center justify-center text-center space-y-2">
                        <div class="font-semibold text-3xl">
                            <p>Enter OTP Code</p>
                        </div>
                        <div class="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {tempUser?.email}</p>
                        </div>
                    </div>

                    <div>
                        <form action="" method="post">
                            <div class="flex flex-col space-y-16">
                                <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    <div class="w-16 h-16 ">
                                        <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""
                                            value={one}
                                            onChange={(e) => handleOTP(e.target.value, setOne)}
                                        />
                                    </div>
                                    <div class="w-16 h-16 ">
                                        <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""
                                            value={two}
                                            onChange={e => handleOTP(e.target.value, setTwo)}
                                        />
                                    </div>
                                    <div class="w-16 h-16 ">
                                        <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""
                                            value={three}
                                            onChange={e => handleOTP(e.target.value, setThree)}
                                        />
                                    </div>
                                    <div class="w-16 h-16 ">
                                        <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""
                                            value={four}
                                            onChange={e => handleOTP(e.target.value, setFour)}
                                        />
                                    </div>
                                </div>

                                <div class="flex flex-col space-y-5">
                                    <div>
                                        <button onClick={handleSubmit} class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                            Submit
                                        </button>
                                    </div>

                                    <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve code?</p>
                                        <div class="flex flex-row items-center text-blue-600 cursor-pointer" onClick={resendOTP}>Resend</div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default VerifyOTP