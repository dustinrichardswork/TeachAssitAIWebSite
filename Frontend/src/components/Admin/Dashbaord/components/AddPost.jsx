import React, { useState } from 'react';
import ImageSelector from './ImageSelector';
import api from '../../../../util/api';
import { toast } from 'react-toastify';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      shortDescription,
      longDescription,
      image
    };


    try {

      const res = await api.post('/admin/post/new', postData)
      console.log('CHeck the data: ', res);
      if (res.data.success) {
        console.log('Blog post created successfully');
        toast("Post Created Successfuly!")
        // Reset form fields if needed
        setTitle('');
        setShortDescription('');
        setLongDescription('');
        setImage('');
      }

    } catch (error) {
      toast("Failed to Create Post!")
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <div>
      <h1 className='text-center text-4xl font-extrabold mb-10'>Create Blog Post</h1>
      <form onSubmit={handleSubmit} className='shadow-2xl max-w-[40rem] mx-auto py-5 px-3 md:py-12 md:px-12'>
        <div className='flex flex-col gap-2 mb-6'>
          <label htmlFor="title" className='text-xl'>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='rounded-lg h-10 px-2 bg-gray-300'
          />
        </div>
        <div className='flex flex-col gap-2 mb-6'>
          <label htmlFor="shortDescription" className='text-xl'>Short Description:</label>
          <input
            type="text"
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
            className='rounded-lg h-10 px-2 bg-gray-300'
          />
        </div>
        <div className='flex flex-col gap-2 mb-6'>
          <label htmlFor="longDescription" className='text-xl'>Long Description:</label>
          <textarea
            id="longDescription"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            required
            className='rounded-lg px-2 py-2 h-32 bg-gray-300'
          />
        </div>

        <ImageSelector image={image} setImage={setImage} />
        <div className='mt-10 flex justify-end'>
          <button type="submit" className='border-2 border-secondary px-5 py-3 bg-transparent hover:bg-primary hover:text-white'>Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
