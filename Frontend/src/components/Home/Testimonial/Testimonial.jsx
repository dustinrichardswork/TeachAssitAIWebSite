// import { Rating } from '@mui/material'
import React from 'react'

function Testimonial({ review }) {
    return (
        <section class="mt-10 rounded-[1rem] w-full md:h-96 overflow-hidden" style={{
            boxShadow: '0px 0px 38px -11px rgba(0,0,0,0.35)'
        }}>
            <div class="max-w-screen-xl px-4 mx-auto h-full lg:px-6">
                <figure class="mx-auto px-5  h-full py-4 lg:py-16">
                    <div className='flex flex-col justify-between h-full'>
                        <div className=''>
                            <blockquote>
                                <p
                                    class=" text-lg text-start text-secondary">"
                                    {review ? review.comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora facere dicta quidem, beatae accusantium, commodi quas quos, officia maiores quibusdam enim eum iure reiciendis perspiciatis id. Aut aliquam culpa et."}
                                </p>
                            </blockquote>
                        </div>
                        <div>

                            <div className="flex flex-col gap-2">

                                <div class="flex items-center">
                                    {
                                        [0, 1, 2, 3, 4].map((el, i) => (
                                            <svg aria-hidden="true" key={i} class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        ))
                                    }
                                </div>

                            </div>
                            <figcaption class="flex flex-col justify-start">
                                {/* <img class="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" /> */}
                                <div class="flex items-center divide-x-2 divide-gray-500">
                                    <div class="pr-3 text-gray-900 font-semibold">
                                        {review.name}
                                    </div>
                                </div>
                                <div>
                                    {review.place}
                                </div>
                            </figcaption>
                        </div>
                    </div>
                </figure>
            </div>
        </section>
    )
}

export default Testimonial