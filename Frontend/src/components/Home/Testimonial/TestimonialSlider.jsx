import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useMediaQuery } from '@react-hook/media-query';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './TestimonialSlider.css'
import Testimonial from './Testimonial'



const mobileTestimonials = [
  {
    comment: "Teach Assist AI has been a game-changer in my classroom. The essay grading feature not only saves me time but also provides insightful feedback that helps my students improve. It's like having a personal assistant!",
    name: "Sarah T",
    place: "High School Teacher"
  },
  {
    comment: "As an educator, time management is crucial. Teach Assist AI's lesson planner has made my life easier by helping me organize and create effective lessons. It's a powerful tool for educators.",
    name: "Linda S",
    place: "College Professor"
  },
  {
    comment: "Teach Assist AI has transformed our teaching methods. The ability to white-label and tailor the tool to our school's branding and requirements has given us a unique edge in providing quality education.",
    name: "David W",
    place: "School Administrator"
  },
  {
    comment: "Teach Assist AI has become my teaching partner. The math quiz feature has made learning numbers fun and interactive for my young students.",
    name: "Emily R",
    place: "Elementary School Teacher"
  },
  {
    comment: "Teach Assist AI has been a blessing for home schooling. The lesson planner is so flexible, helping me create tailored lessons that suit my child's learning pace.",
    name: "Samantha L",
    place: "Home Schooling Parent"
  },
  {
    comment: "Teach Assist AI is the future of education. Its ability to adapt content and quizzes has transformed the way we learn and teach.",
    name: "Robert K",
    place: "Education Enthusiast"
  },
  {
    comment: "Teach Assist AI has made home schooling a breeze. The comprehension lesson generator helps me create engaging materials that cater to my child's learning style.",
    name: "Michelle D",
    place: "Home Schooling Parent"
  },
  {
    comment: "The Essay Chatbot has been a tremendous asset in grading essays efficiently. It not only saves me hours of time but also provides insightful feedback that helps my students grow as writers.",
    name: "Daniel P",
    place: "High School Teacher"
  },
  {
    comment: "The Video Chatbot has revolutionized my language lessons. It effortlessly transforms videos into engaging quizzes, enhancing my students' comprehension and making learning interactive.",
    name: "Rachel M",
    place: "Language Educator"
  },
  {
    comment: "The PowerPoint Presentation Tool has become my secret weapon in engaging my students. It simplifies the process, allowing me to focus on delivering impactful content.",
    name: "Jessica W",
    place: "High School Teacher"
  },
  {
    comment: "The AI Detector with Plagiarism Checker is a game-changer for maintaining academic integrity. It's an essential tool that ensures originality and supports ethical learning.",
    name: "Ryan S",
    place: "High School Teacher"
  },
  {
    comment: "As a home-schooling parent, I wasn't sure how to create engaging lessons. Teach Assist AI's user-friendly tools made it effortless, even for someone without formal teaching experience.",
    name: "Alex C",
    place: "Home Schooling Parent"
  }
];
const testimonials = [
  [
    {
      comment: "Teach Assist AI has been a game-changer in my classroom. The essay grading feature not only saves me time but also provides insightful feedback that helps my students improve. It's like having a personal assistant!",
      name: 'Sarah T',
      place: 'High School Teacher'
    },
    {
      comment: "As an educator, time management is crucial. Teach Assist AI's lesson planner has made my life easier by helping me organize and create effective lessons. It's a powerful tool for educators.",
      name: 'Linda S',
      place: 'College Professor'
    }
  ],
  [
    {
      comment: "Teach Assist AI has transformed our teaching methods. The ability to white-label and tailor the tool to our school's branding and requirements has given us a unique edge in providing quality education.",
      name: 'David W',
      place: 'School Administrator'
    },
    {
      comment: 'Teach Assist AI has become my teaching partner. The math quiz feature has made learning numbers fun and interactive for my young students.',
      name: 'Emily R',
      place: 'Elementary School Teacher'
    }
  ],
  [
    {
      comment: "Teach Assist AI has been a blessing for home schooling. The lesson planner is so flexible, helping me create tailored lessons that suit my child's learning pace.",
      name: 'Samantha L',
      place: 'Home Schooling Parent'
    },
    {
      comment: 'Teach Assist AI is the future of education. Its ability to adapt content and quizzes has transformed the way we learn and teach.',
      name: 'Robert K',
      place: 'Education Enthusiast'
    }
  ],
  [
    {
      comment: "Teach Assist AI has made home schooling a breeze. The comprehension lesson generator helps me create engaging materials that cater to my child's learning style.",
      name: 'Michelle D',
      place: 'Home Schooling Parent'
    },
    {
      comment: 'The Essay Chatbot has been a tremendous asset in grading essays efficiently. It not only saves me hours of time but also provides insightful feedback that helps my students grow as writers.',
      name: 'Daniel P',
      place: 'High School Teacher'
    }
  ],
  [
    {
      comment: "The Video Chatbot has revolutionized my language lessons. It effortlessly transforms videos into engaging quizzes, enhancing my students' comprehension and making learning interactive.",
      name: 'Rachel M',
      place: 'Language Educator'
    },
    {
      comment: 'The PowerPoint Presentation Tool has become my secret weapon in engaging my students. It simplifies the process, allowing me to focus on delivering impactful content.',
      name: 'Jessica W',
      place: 'High School Teacher'
    }
  ],
  [
    {
      comment: "The AI Detector with Plagiarism Checker is a game-changer for maintaining academic integrity. It's an essential tool that ensures originality and supports ethical learning.",
      name: 'Ryan S',
      place: 'High School Teacher'
    },
    {
      comment: "As a home-schooling parent, I wasn't sure how to create engaging lessons. Teach Assist AI's user-friendly tools made it effortless, even for someone without formal teaching experience.",
      name: 'Alex C',
      place: 'Home Schooling Parent'
    }
  ]
]

export default function TestimonialSlider() {

  const isMobile = useMediaQuery('(max-width: 680px)');


  const containerStyle = {
    paddingBottom: '100px',
    // backgroundColor: 'gray',
    paddingLeft: '50px',
    paddingRight: '50px',
    width: '100%',
  };

  const padding = '20px'
  if (isMobile) {
    containerStyle.paddingLeft = padding;
    containerStyle.paddingRight = padding;
    containerStyle.paddingBottom = '50px'
  }

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      // spaceBetween={120}
      // slidesPerView={3}
      navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      autoplay={{
        delay: 2000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      }}
      loop  
      breakpoints={
        {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 70
          },
          // when window width is >= 480px
          // 480: {
          //     slidesPerView: 2,
          //     spaceBetween: 50
          // },
          // // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 50,
            autoplay: false
          }
        }
      }
      style={containerStyle}
    >
      {
        isMobile ? (
          mobileTestimonials.map((review, i) => (
            <SwiperSlide key={i}>
              <Testimonial review={review} />
            </SwiperSlide>
          ))
        ) : (


          testimonials.map((el, i) => (
            <SwiperSlide key={i}>
              <div className=' flex flex-col'>
                {
                  el.map((review) => {
                    return <Testimonial review={review} />
                  })
                }
              </div>
            </SwiperSlide>
          ))
        )
      }
    </Swiper >
  );
};