import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import logo from '../images/logo-removebg-preview.png'
import Menu from './SVGs/Menu';
import Cross from './SVGs/Cross';
import { UserContext } from '../context/UserContext';

import { site } from '../util/variables';

const Navbar = () => {
    const navigate = useNavigate();

    const { isAuthenticated, user, logout } = useContext(UserContext)

    const width = window.innerWidth
    const [menu, setMenu] = useState((width > 680) ? true : false)

    const handleClick = () => {
        setMenu(!menu)
    }

    return (
        <div className=''>
            <header className='flex justify-between gap-5 pt-5 pb-5 px-2 md:px-4 items-center  relative max-w-[1640px] mx-auto'>
                <Link to={`${isAuthenticated ?
                    "/user/dashboard/chatbots"
                    : "/"
                    }`} className=' flex items-center gap-3'>
                    {/* <div className='text-3xl ml-8 tracking-wider'>Khalil Ahmad</div> */}
                    <img src={logo} className='h-12 ' alt="logo" />
                    <h2 className=' text-primary text-2xl font-bold'>Teach Assist <span className=' text-orange-600'>AI</span></h2>
                </Link>
                <div className={`flex flex-1 gap-14 ${!isAuthenticated ? 'justify-center' : 'md:pl-2'}`}>
                    {
                        menu && (
                            <div className={`absolute md:static right-0 top-[5rem] w-full h-screen md:h-auto z -10 bg-white md:bg-transparent flex flex-col gap-20`}>
                                <ul
                                    className={` md:bg-transparent ${!isAuthenticated ? 'justify-center' : 'md:pl-2 bg-red-200'} text-white md:text-secondary pt-10 md:pt-3 md:pb-3 rounded flex flex-col md:flex-row gap-3 md:gap-5`}>
                                    {
                                        !isAuthenticated &&
                                        [
                                            { text: 'AI Teachers', url: '/teachers' },
                                            { text: 'Blogs', url: '/blogs' },
                                            { text: 'Pricing', url: '/pricing' },
                                        ].map((el, i) => (
                                            <Link
                                                to={(site ? site : '') + el.url}
                                                className=' tracking-wide hover:text-primary'
                                                onClick={() => {
                                                    if (window.innerWidth < 680) {
                                                        setMenu(false)
                                                    }
                                                }}
                                                key={i}
                                            >
                                                <p className='pl-5 text-2xl md:text-lg'>
                                                    {el.text}
                                                </p>
                                            </Link>
                                        ))
                                    }
                                    {
                                        isAuthenticated && (

                                            (user?.role === 'admin') ? (
                                                <>
                                                    <Link
                                                        to={(site ? site : '') + '/blogs'}
                                                        className=' tracking-wide hover:text-primary'
                                                        onClick={() => {
                                                            if (window.innerWidth < 680) {
                                                                setMenu(false)
                                                            }
                                                        }}
                                                    >
                                                        <p className='pl-5 text-2xl md:text-lg'>
                                                            Blogs
                                                        </p>
                                                    </Link>
                                                    <Link
                                                        to={(site ? site : '') + '/admin/dashboard/users'}
                                                        className='text-md block tracking-wide hover:text-primary'
                                                        onClick={() => {
                                                            if (window.innerWidth < 680) {
                                                                setMenu(false)
                                                            }
                                                        }}

                                                    >
                                                        <p className='pl-5 text-2xl md:text-lg'>
                                                            Dashboard
                                                        </p>
                                                    </Link>
                                                </>
                                            ) : (
                                                <Link
                                                    to={(site ? site : '') + '/user/dashboard/chatbots'}
                                                    className='text-md block tracking-wide hover:text-primary'
                                                    onClick={() => {
                                                        if (window.innerWidth < 680) {
                                                            setMenu(false)
                                                        }
                                                    }}

                                                >
                                                    <p className='text-2xl md:text-lg'>
                                                        Dashboard
                                                    </p>
                                                </Link>
                                            )
                                        )
                                    }
                                    {
                                        !isAuthenticated ? (
                                            <Link
                                                to={(site ? site : '') + '/login'}
                                                className=' text-2xl md:text-lg block md:hidden tracking-wide hover:text-primary'
                                                onClick={() => setMenu(false)}

                                            >
                                                <p className='pl-5'>
                                                    Login
                                                </p>
                                            </Link>
                                        ) : (
                                            <Link
                                                to={(site ? site : '') + '/login'}
                                                className='text-md block md:hidden tracking-wide hover:text-primary'
                                                onClick={() => { setMenu(false); logout(); }}

                                            >
                                                <p className='pl-5 text-2xl md:text-lg'>
                                                    Logout
                                                </p>
                                            </Link>
                                        )
                                    }
                                </ul>
                                {
                                    (window.innerWidth < 680) && <div>
                                        <div className=' py-10 flex flex-col gap-5 max-w-[400px] mx-auto'>
                                            <button onClick={() => { setMenu(false); navigate('/signup') }} className=' bg-secondary text-white py-5 mx-7 rounded-lg'>
                                                Get started for free
                                            </button>
                                            <button className=' border-secondary  text-secondary border-2 py-5 mx-7 rounded-lg'>
                                                Watch how it works
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
                <div className='hidden md:flex items-center gap-5'>
                    {
                        !isAuthenticated ? (
                            <Link to='/login'>
                                <button className='text-lg opacity-75'>Login</button>
                            </Link>
                        ) : (
                            <button className='text-lg opacity-75' onClick={logout}>Logout</button>
                        )
                    }
                    {
                        !isAuthenticated ? (
                            <Link to='/signup'>
                                <button className='px-3 py-1 rounded-md border-2 text-white bg-[#ed7742]'>
                                    Start my free trial
                                </button>
                            </Link>
                        ) : (
                            <Link to='/pricing'>
                                <button className='px-3 py-1 rounded-md border-2 text-white bg-[#ed7742]'>
                                    upgrade plan
                                </button>
                            </Link>
                        )
                    }
                </div>
                <div className='block md:hidden cursor-pointer' onClick={handleClick}>
                    {
                        !menu ? <Menu /> : <Cross />
                    }
                </div>
            </header>
        </div>
    )
}

export default Navbar