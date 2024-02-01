const testimonials = [
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
  
  // Split the testimonials array into sub-arrays of 2 objects each
  const subArrays = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    subArrays.push(testimonials.slice(i, i + 2));
  }
  
  // Now each sub-array in `subArrays` will contain 2 objects
  console.log(subArrays);
  