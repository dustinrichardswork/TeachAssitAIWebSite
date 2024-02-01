import React from 'react'

import logo from '../images/logo-removebg-preview.png'
import facebook from '../images/Icons/facebook.svg'
import insta from '../images/Icons/insta.svg'
import linkedin from '../images/Icons/linkedin.svg'
import twitter from '../images/Icons/twitter.jpeg'
import tiktok from '../images/Icons/tiktok.svg'

import { Link } from 'react-router-dom'

import { site } from '../util/variables'



const Footer = () => {

    return (
        <div className='max-w-[1440px] mx-auto md:mt-20 border-t-2 pt-10 pb-5'>
            <footer className=' mx-10 md:mx-20 flex flex-col-reverse md:flex-row justify-between gap-5'>
                <div style={{ flex: 2 }}>
                    <div className=''>
                        <Link to='/' className=' flex items-center gap-3'>
                            {/* <div className='text-3xl ml-8 tracking-wider'>Khalil Ahmad</div> */}
                            <img src={logo} className='h-16 ' alt="logo" />
                            <h2 className=' text-primary text-2xl font-bold'>Teach Assist <span className=' text-orange-600'>AI</span></h2>
                        </Link>
                        <p
                            className=' mt-3 md:mr-20 text-sm text-justify text-secondary'>
                            Teach Assist AI is your dedicated personal assistant, enhancing your efficiency and productivity as an educator. Our advanced AI engine handles all the mundane tasks, liberating your time to focus on what truly counts – teaching, learning, and fostering authentic connections with your students.
                            Experience the freedom to prioritize what matters most, while Teach Assist AI streamlines your workload and empowers you to create impactful educational experiences.
                        </p>
                        <div className="flex gap-5 my-5">

                            {
                                [
                                    {
                                        icon: facebook,
                                        url: 'https://www.facebook.com/teachassistai'
                                    },
                                    {
                                        icon: insta,
                                        url: 'https://www.instagram.com/teachassist_ai/'
                                    }
                                    ,
                                    {
                                        icon: linkedin,
                                        url: 'https://www.linkedin.com/company/teach-assist-ai'
                                    }
                                    ,
                                    {
                                        icon: tiktok,
                                        url: ' https://www.tiktok.com/@teachassistai'
                                    },
                                    {
                                        icon: twitter,
                                        url: ' https://twitter.com/teachassist_ai'
                                    }
                                ].map((el, i, arr) => (
                                    <a href={el.url} target='_blank'>
                                        {
                                            (i === arr.length - 1) ? (

                                                <img src={el.icon} className=' h-8 rounded w-9 mt-2' alt="Icon" />
                                            ) : (
                                                <img src={el.icon} clas alt="Icon" />
                                            )
                                        }
                                    </a>
                                ))
                            }
                        </div>
                        <div className='flex-nowrap'>
                            Copyright 2023 Teach Assist AI
                            |
                            <Link
                                className='underline text-blue-600 mx-2'
                                to={"/privacy"}
                            >
                                Privacy
                            </Link>
                            |
                            <Link
                                className='underline text-blue-600 ml-2'
                                to={"/terms"}
                            >
                                Terms
                            </Link>
                            |
                            <Link
                                className='underline text-blue-600 ml-2'
                                to={"/cookies-policy"}
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>

                </div>
                <div className='flex-1'></div>
                <div className='flex-1'></div>

                <div className='block flex-1'>
                    <div className=''>
                        <h1 className='text-4xl mb-5'>Company</h1>
                        <ul className='pl-2'>
                            <ul className='flex flex-col gap-3'>

                                {
                                    [
                                        { text: 'About Us', url: '/about' },
                                        { text: 'Blogs', url: '/blogs' },
                                        { text: 'FAQ', url: '/faq' },
                                        { text: 'Affliate Program', url: '/affliate' },
                                        { text: 'Pricing', url: '/pricing' },
                                        { text: 'Contact Us', url: '/contact' },
                                    ].map((el, i) => (
                                        <li key={i}><Link to={(site ? site : '') + el.url} className='text-md tracking-wide hover:text-primary hover:border-secondary'>{el.text}</Link></li>
                                    ))
                                }
                            </ul>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer