import React, { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../util/api';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [pdfAnswer, setPdfAnswer] = useState([])
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [categoryOpen, setCategoryOpen] = useState('')

    const [tempUser, setTempUser] = useState(null);

    const login = async (credentials) => {
        try {
            const verifiedDevice = localStorage.getItem("teachai_verified_device")
            console.log('VerifiedDevice: ', verifiedDevice);
            
            const { data } = await api.post('/login', { ...credentials, verifiedDevice });

            console.log('Here is the data for User: ', data);
            const { token, user, verified } = data;

            if (!user.verified) {
                localStorage.setItem("teachai_token", token)
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setTempUser({ userId: user._id, email: user.email, send: true })
                navigate("/verify-otp")
                toast("Your Account is not Verified")
            } else if (!verified) {
                localStorage.setItem("teachai_token", token)
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setTempUser({ userId: user._id, email: user.email, send: true })
                navigate("/verify-otp")
            } else {
                localStorage.setItem("teachai_token", token)
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsAuthenticated(true)
                setUser(user);

                toast("LoggedIn Successfully")

                if (user.role === 'admin') {

                    navigate('/admin/dashboard/users')
                } else {

                    navigate('/user/dashboard/chatbots')
                }
            }



            // if (user.verified) 

        } catch (error) {
            console.error('Failed to Login:', error.message);
            toast("Email or Password is Wrong!")
        }
    };

    const register = async (data, setLoading) => {
        try {
            const res = await api.post('/register', data);

            console.log('User registered successfully:', res.data);

            toast("OTP sent to Your Email!")

            setTempUser(res.data.data)
            setLoading(false);
            navigate('/verify-otp')
        } catch (error) {
            if (error.response.status) {
                toast("Email is Already Used!")
                // toast("Use Another Email! Thank You!")
            }
            console.log("Error", error.response.status);
            console.error('Failed to register user:', error?.response.data);
            setLoading(false)
        }
    };

    const logout = async () => {

        try {

            const res = await api.get("/logout");
            console.log('User Logout successfully:', res);

            if (user?.TwoFA) {
                localStorage.removeItem("teachai_verified_device");
            }
            
            // localStorage.removeItem("teachai_verified_device");
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem("teachai_token")
            localStorage.removeItem("teachai_user")
            setIsAuthenticated(false)
            setUser(null);
            toast('Logout Successfuly!')
            navigate('/')
        } catch (error) {
            console.error('Failed To Logout:', error.message);
            toast("Failed to Logout The User!")
        }
    };

    const isLoggedin = () => {
        // Check if the token exists in local storage
        const storedToken = localStorage.getItem('teachai_token');
        const user = localStorage.getItem('teachai_user')

        if (storedToken) {
            // Use the stored token for authentication
            console.log('Token is stored');
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            console.log('\n\n\nToken: ', storedToken);
            setIsAuthenticated(true)

            if (user) {
                setUser(JSON.parse(user))
            } else {
                getUserData()
            }
        }
        else {
            if (!location.pathname === '/') {
                navigate('/login')
            }
        }

    }


    const getUserData = async () => {
        try {
            const { data } = await api.get('/me');
            const { user } = data
            setUser(user);
            localStorage.setItem('teachai_user', JSON.stringify(user))
        } catch (error) {
            console.error('Failed to Get User Data:', error.message);
        }
    }

    const getAllUsers = () => {

        api.get('/admin/users')
            .then(({ data }) => {
                // Handle the response data
                const { users } = data
                setUsers(users)
                console.log('Users:', users);
            })
            .catch((error) => {
                console.error('Error retrieving users:', error);
            });

    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            login,
            register,
            logout,
            isLoggedin,
            isAuthenticated,
            setIsAuthenticated,
            users,
            getAllUsers,
            categoryOpen,
            setCategoryOpen,
            pdfAnswer,
            setPdfAnswer,
            tempUser,
            setTempUser,
            getUserData
        }}>
            {children}
        </UserContext.Provider>
    );
};