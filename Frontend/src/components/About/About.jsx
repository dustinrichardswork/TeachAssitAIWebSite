import React from 'react'
import Values from './Values'
import { Helmet } from 'react-helmet'

const About = () => {
  return (
    <div className=' max-w-[1440px] mx-auto mb-16'>

      <Helmet>
        <meta charSet="utf-8" />
        <title>About | Teach Assist AI</title>
      </Helmet>


      <div className='md:mt-10 mb-16'>
        <h1 className=' text-3xl md:text-4xl mb-8 font-extrabold text-center text-secondary'>
          About Teach Assist AI
        </h1>
        {
          [
            "Welcome to Teach Assist AI, where we understand the needs and challenges of educators like no one else. We firmly believe that teachers deserve solutions specifically designed to support and enhance their invaluable work in the classroom.",

            "Teaching is an incredibly demanding profession, requiring passion, dedication, and countless hours of hard work. As former educators ourselves, we intimately understand the daily struggles teachers face. The overwhelming workload, the constant planning and grading, and the ongoing quest for a healthy work-life balance can often leave teachers feeling drained and overwhelmed. We recognize that these challenges have led many talented educators to consider leaving the profession they love. At Teach Assist AI, we are here to make a difference.",

            "Our mission is to empower teachers by providing them with the tools they need to excel in their profession. We firmly believe that artificial intelligence is not here to replace teachers, but rather to amplify their impact. By leveraging the power of AI, we aim to help teachers streamline their tasks, free up valuable time, and ultimately focus on what matters most: improving learning outcomes for their students.",

            "We have created Teach Assist AI with the specific needs of teachers in mind. Our solutions are developed by educators, for educators. We understand the importance of designing tools that seamlessly integrate into the classroom, ensuring that teachers can easily navigate and utilize our technology. Our goal is to help teachers embrace technology as a valuable ally, rather than something to be feared.",

            "With Teach Assist AI, we strive to revolutionize education by providing teachers with the support they deserve. We want to empower educators to work smarter, not harder. By reducing their workload, improving productivity, and fostering a healthy work-life balance, we aim to rejuvenate the teaching profession and inspire educators to reach new heights of excellence. Join us on this exciting journey as we transform education together. Let Teach Assist AI be your partner in unlocking your full teaching potential, enabling you to make a lasting impact on the lives of your students. Together, we can create a brighter future for education."
          ].map((el, i) => (
            <p
              className='text-lg mx-3 md:mx-32 text-secondary mb-5'
              key={i}>
              {el}
            </p>
          ))
        }
      </div>
      <h1 className='text-center text-5xl md:my-16 text-secondary'>Our Values</h1>
      <Values />
    </div>
  )
}

export default About