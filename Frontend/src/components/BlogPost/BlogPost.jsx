import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { backend_url } from '../../util/variables';
import { toast } from 'react-toastify';
import api from '../../util/api';

const BlogPost = () => {

    const [post, setPost] = useState(null)

    const { postId } = useParams();


    const fetchPost = async () => {
        try {
            const { data } = await api.get(`/post/${postId}`)
            setPost(data.post)
        } catch (error) {
            console.log('Error: ', error);
            toast('Error While Getting Post Data')
        }
    }

    useEffect(() => {

        fetchPost()

    }, [])
    // Fetch the data for the specific blog post using the postId
    // ...

    return (
        <div className=' max-w-[1440px] mx-auto mt-12'>
            <div className=' mx-3 md:mx-8'>
                {
                    post ? (
                        <div className='lg:w-[66%] mx-auto'>
                            <h3 className='text-3xl md:text-4xl font-bold my-4'>{post.title}</h3>
                            <img src={post.image.url} className=' h-auto w-full' alt="" />
                            <div className=' my-5'>
                                <p className=' text-lg md:text-xl'>{post.longDescription}</p>
                            </div>
                        </div>
                    ) : (
                        <div>Loading</div>
                    )
                }
            </div>

        </div>
    );
};

export default BlogPost;
