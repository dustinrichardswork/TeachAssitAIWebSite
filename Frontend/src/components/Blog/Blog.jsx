import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backend_url } from '../../util/variables'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Blog = () => {

    const [posts, setPosts] = useState(null)

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get((backend_url ? backend_url : '') + '/posts')
            setPosts(data.posts)
            console.log('Data: ', data);
        } catch (error) {
            console.log('Error while fetching the blogs: ', error);
        }
    }

    useEffect(() => {

        fetchPosts()

    }, [])

    return (
        <div className=' max-w-[1440px] mx-auto'>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Blogs | Teach Assist AI</title>
            </Helmet>

            <div className="mx-32">

                <h1 className='text-center text-2xl md:text-4xl font-bold py-10 text-primary'>Blogs</h1>

                <p className=' text-secondary text-sm md:text-lg text-justify'>
                    Welcome to the Teach Assist AI Blog, your go-to online resource for staying informed about the latest platform updates, helpful tips and tricks, and intriguing insights. As an educator, we understand the importance of continuous learning and staying up to date with the latest trends in education technology. Our blog is designed to provide you with valuable resources, inspiration, and practical knowledge to enhance your teaching experience with AI teachers from Teach Assist AI. Whether you're seeking innovative ideas for lesson planning, strategies to promote student engagement with AI teachers, or guidance on utilizing AI in the classroom, our blog is here to support and inspire you on your educational journey. Stay connected, explore our articles, and discover how Teach Assist AI can transform your teaching practice.
                </p>

                <div className=' grid grid-cols-3 gap-5 mt-10'>

                    {
                        posts?.map((post) => (
                            <Link to={`/blogs/${post._id}`}>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex-1 h-56 overflow-hidden bg-cover'>
                                        <img src={post.image.url} alt="post" className='w-full h-full' />
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <h3 className='text-2xl font-semibold tracking-widest text-primary'>{post.title}</h3>
                                        <p className='text-secondary'>{post.shortDescription}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Blog