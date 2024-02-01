import Feature from './Feature'
import feature3 from '../../images/Home/ai-powerpoint.jpg'


// import animation1 from '../../animation/iPad/descktop.json'
import animation1Desktop from '../../animation/iPad/descktop.json';
import animation1Mobile from '../../animation/iPad/mobile.json';
import animation2Desktop from '../../animation/Final JSON/Design 2 (Detect AI Writing).json'
import animation2Mobile from '../../animation/Final JSON/Mobile (detect AI Writing).json';

const features = [
    {
        title: "Curriculum Creation Simplified",
        description: "With the assistance of our AI Teacher chatbots and curated resources, you can effortlessly generate customized learning materials and worksheets. Our platform leverages advanced technology and AI capabilities to ensure that the content you create aligns perfectly with your classroom needs. Say goodbye to hours of searching for suitable resources - our streamlined approach saves you time and empowers you to focus on what matters most: delivering high-quality education to your students.",
        buttonText: "See More",
        desktop: animation1Desktop,
        mobile: animation1Mobile
    },
    {
        title: "AI-Writing and Plagiarism Detection",
        description: "Discover the ultimate tool for AI-Writing and Plagiarism Detection. Our advanced solution offers unrivaled accuracy in identifying AI- generated content, ensuring academic integrity. Assess student effort, detect plagiarism, and promote a fair academic environment.",
        buttonText: "See More",
        desktop: animation2Desktop,
        mobile: animation2Mobile
    },
    {
        title: "ESL Activity Suggestion",
        description: "Empower English Second Language (ESL) students to excel in English language skills with our ESL Activity Suggestion Chatbot. Offering a wealth of sample ESL activities targeting key language elements like nouns, verbs, and adjectives, it's your essential tool for language mastery.",
        buttonText: "See More",
        image: feature3
    }

]



export default function Features() {
    return (
        <div className='md:mt-20 md:mx-8'>

            {/* <p className='text-center text-secondary opacity-50'>AMAZING FEATURES</p> */}

            <h2 className=' hidden md:block text-3xl md:text-4xl text-center font-extrabold mt-4 mb-4 md:mb-12 text-secondary'>
                Discover the capabilities of the AI Teacher chatbots
            </h2>

            {
                features?.map((el, i) => (
                    <Feature
                        title={el.title}
                        description={el.description}
                        buttonText={el.buttonText}
                        image={el.image}
                        desktop={el.desktop}
                        mobile={el.mobile}
                        key={i}
                        index={i} />
                ))
            }
        </div>
    )
}
