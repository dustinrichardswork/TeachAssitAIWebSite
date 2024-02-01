import React from 'react'
import { Helmet } from 'react-helmet'


const data = [
    {
        title: '1. Introduction',
        description: `Welcome to Teach Assist AI, a cutting-edge platform that leverages artificial intelligence to revolutionize the educational landscape. Our services are designed to assist teachers in various aspects of their work, including but not limited to creating engaging lesson plans, generating interactive quizzes, grading essays, and ensuring the originality of content. By accessing or using our website, located at <a href="/" style="color: blue; text-decoration: underline;"> www.teachassistai.com </a>, you agree to comply with and be bound by the following terms and conditions.<br /><br />
        Teach Assist AI is operated in Australia but offers its Services to customers worldwide. As such, these Terms are subject to the laws of Australia and comply with international legal standards. These terms and conditions ("Terms") govern your access to and use of Teach Assist AI's website, products, and services (collectively, the "Services").
        <br />
        <br />
        <b>PLEASE READ THESE TERMS CAREFULLY, AS THEY CONTAIN IMPORTANT INFORMATION ABOUT YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. BY ACCESSING OR USING THE SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS AND ALL APPLICABLE LAWS AND REGULATIONS.</b>
        `
    },
    {
        title: "2. Acceptance of Terms",
        description: "By accessing or using the Services, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Services. We reserve the right to modify or amend these Terms at any time without notice. Your continued use of the Services following any changes constitutes your acceptance of the revised Terms."
    },
    {
        title: "3. Educational Content and Integrity",
        description: "Teach Assist AI provides tools to enhance educational content and maintain academic integrity. Users agree not to misuse these tools for fraudulent purposes, such as generating plagiarized content or misrepresenting educational achievements. Teach Assist AI reserves the right to monitor the use of its services to ensure compliance with ethical educational practices."
    },
    {
        title: "4. User Registration",
        description: "To access certain features of the Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and agree not to disclose it to any third party. You are responsible for any activities or actions under your account, whether or not you have authorized such activities or actions."
    },
    {
        title: "5. Use of Services",
        description: "You agree to use the Services in accordance with all applicable laws and regulations, including but not limited to intellectual property laws, privacy laws, and export control laws. You may not use the Services for any unlawful or prohibited purpose. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services without our express written consent."
    },
    {
        title: "6. Privacy and Data Protection",
        description: "Your privacy is of utmost importance to us. Please refer to our privacy policy for more information on this section."
    },
    {
        title: "7. User Responsibilities and Conduct",
        description: "As a user of Teach Assist AI, you are responsible for all activities that occur under your account. You agree to use the Services in a manner that is lawful, ethical, and in accordance with these Terms. You shall not use the Services to infringe upon the rights of others, engage in fraudulent activities, or disseminate harmful or offensive material. You agree to promptly notify Teach Assist AI of any unauthorized use of your account or any other breach of security."
    },
    {
        title: "8. Intellectual Property Rights",
        description: "All intellectual property rights in and to the Services, including but not limited to copyrights, trademarks, patents, and trade secrets, are owned by Teach Assist AI or its licensors. You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial purposes. Any unauthorized use, reproduction, or distribution of the Services or any part thereof is strictly prohibited and may result in legal action."
    },
    {
        title: "9. Subscription Plans and Payment Terms",
        description: `Teach Assist AI offers a range of subscription plans designed to cater to the diverse needs and preferences of educators, educational institutions, and other professionals in the education sector.
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: disc;">
        <li><b>Monthly Subscription:</b> By purchasing a monthly subscription, you agree to an initial and recurring monthly subscription fee at the then-current Monthly Subscription rate, and you accept responsibility for all recurring charges until you cancel your subscription. You may cancel your monthly subscription at any time, subject to the terms of our cancellation policy.</li><br/>
        
        <li><b>Payment Terms:</b> All subscription fees are payable in advance and are non-refundable except as expressly provided in our Refund Policy. Users agree to provide accurate and current payment information and to promptly update such information if it changes. Failure to provide accurate payment information or to pay subscription fees when due may result in suspension or termination of services.</li><br/>

        <li><b>Changes to Plans and Pricing:</b> Teach Assist AI reserves the right to modify, add, or remove subscription plans, features, or pricing at any time, with or without notice. Any such changes will be communicated to existing subscribers in accordance with applicable laws and regulations.</li>
        </ul>
        `
    },
    {
        title: "10. Refund and Cancellation Policy",
        description: `Teach Assist AI strives to provide high-quality services that meet the expectations of our users. However, we understand that circumstances may arise where a user may seek a refund or wish to cancel their subscription.
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Refund Policy:</b> Teach Assist AI offers refunds on the current monthly plan if a user is not satisfied with the product. Refund requests must be submitted in writing within a specified period from the date of purchase, as outlined in our Refund Policy. Each request will be evaluated on a case-by-case basis, considering factors such as the nature of the dissatisfaction, usage of the services, and compliance with these Terms. Teach Assist AI reserves the right to deny any refund request at its sole discretion.</li><br/>
        
        <li><b>Cancellation Policy: </b> Users may cancel their subscription at any time by following the procedures outlined in our Cancellation Policy. Cancellations may be subject to fees or charges, depending on the timing of the cancellation and the terms of the selected subscription plan. Users are responsible for understanding and complying with the cancellation terms applicable to their subscription.</li><br/>

        <li><b>Effect of Cancellation: </b> Upon cancellation, users will retain access to the services until the end of the current billing period, after which all access and benefits will cease. Any data or content associated with the user's account may be deleted or become inaccessible.</li><br/>

        <li><b>Changes to Refund and Cancellation Policies: </b> Teach Assist AI may modify its Refund and Cancellation Policies at any time. Any such changes will be communicated to users and will apply to purchases made after the date of the change.</li>
        </ul>
        `
    },
    {
        title: "11. Third-Party Links and Services",
        description: "Teach Assist AI may provide links to third-party websites or services that are not owned or controlled by Teach Assist AI. These links are provided for your convenience and do not constitute an endorsement by Teach Assist AI. You acknowledge and agree that Teach Assist AI is not responsible for the content, privacy policies, or practices of any third-party websites or services. You should review the terms and conditions and privacy policies of any third-party sites you visit."
    },
    {
        title: "12. Limitation of Liability",
        description: `Teach Assist AI may provide links to third-party websites or services that are not owned or controlled by Teach Assist AI. These links are provided for your convenience and do not constitute an endorsement by Teach Assist AI. You acknowledge and agree that Teach Assist AI is not responsible for the content, privacy policies, or practices of any third-party websites or services. You should review the terms and conditions and privacy policies of any third-party sites you visit.
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>No Guarantee of Accuracy:</b> The AI tools provided by Teach Assist AI rely on algorithms, data, and statistical models that may not always produce accurate or error-free results. Teach Assist AI does not guarantee the accuracy, completeness, or reliability of the results generated by the AI tools and disclaims all liability for any errors or inaccuracies.</li><br/>
        
        <li><b>Not a Substitute for Professional Judgment: </b> The AI tools are intended to supplement, not replace, the professional judgment of educators and other users. Users are responsible for reviewing, validating, and interpreting the results generated by the AI tools and for making independent decisions based on their professional expertise and judgment.</li><br/>

        <li><b>Data and Content Integrity: </b> Users are responsible for providing accurate and complete data and content when using the AI tools. Teach Assist AI shall not be liable for any errors, inaccuracies, or undesirable outcomes resulting from incorrect, incomplete, or misleading data or content provided by users.</li><br/>

        <li><b>Compliance with Ethical Standards: </b> Users agree to use the AI tools in accordance with all applicable laws, regulations, and ethical standards, including those related to academic integrity, privacy, and intellectual property rights. Any misuse of the AI tools for fraudulent or unethical purposes may result in suspension or termination of services.</li><br/>

        <li><b>Limitation of Liability: </b> To the fullest extent permitted by applicable law, Teach Assist AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from or related to the use or reliance on the AI tools, even if Teach Assist AI has been advised of the possibility of such damages.</li><br/>

        <li><b>User Indemnification: </b> Users agree to indemnify, defend, and hold harmless Teach Assist AI from any claims, liabilities, damages, or expenses, including legal fees, arising from or related to their use or misuse of the AI tools, their violation of these Terms, or their infringement of any rights of Teach Assist AI or third parties.</li>
        </ul><br/><br/>
        By accessing or using the AI tools, users acknowledge and agree to these disclaimers and limitations and accept full responsibility for their use of the AI tools in accordance with these Terms.
        `
    },
    {
        title: "13. AI Tools: Usage, Responsibilities, and Limitations",
        description: `
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Risk of Data Leakage: </b><br/>
         Use of AI chatbots on Teach Assist AI involves a risk of customer data leakage. This risk is borne by the customer, as the data is stored with OpenAI. Specific attention must be paid to the risks associated with school data when using our service.</li><br/>
        
        <li><b>User Responsibility: </b><br /> 
        Users are responsible for reviewing and verifying any content, suggestions, or recommendations provided by AI tools on Teach Assist AI before acting upon them.</li><br/>

        <li><b>Educational Use: </b><br/> 
        Teach Assist AI's tools are intended to assist educators and are not a substitute for professional judgment, pedagogical expertise, or personalized interaction between teachers and students.</li><br/>

        <li><b>Algorithmic Transparency: </b><br />
        Teach Assist AI is committed to providing transparency about how our AI algorithms work and how decisions and suggestions are generated.</li><br/>

        <li><b>Feedback and Improvement: </b><br />
        We encourage users to provide feedback about their experiences with the AI tools to help improve their accuracy, relevance, and usability over time.</li><br/>

        <li><b>Liability Limitations: </b><br /> While Teach Assist AI strives to provide accurate and helpful AI tools, we are not liable for any direct or indirect damages or losses arising from the use of our AI tools.</li><br />

        <li><b>User Consent: </b><br />
        By using Teach Assist AI's tools, users consent to the processing of their data as outlined in the terms and conditions, including data collected by the AI for improvement purposes.</li><br/>

        <li><b>Updates and Change: </b><br />
        The terms and conditions may be updated over time to reflect changes in technology, regulations, or services. Users should review these changes periodically.</li><br/>
        </ul>
        `
    },
    {
        title: "14. Warranty Disclaimer",
        description: `Teach Assist AI provides the Services "as is" and "as available," without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. Teach Assist AI does not warrant that the Services will be uninterrupted, error-free, secure, or free from viruses or other harmful components. No advice or information obtained from Teach Assist AI or through the Services shall create any warranty not expressly stated in these Terms.`
    },
    {
        title: "15. Indemnification",
        description: "You agree to indemnify, defend, and hold harmless Teach Assist AI, its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, liabilities, expenses, damages, and costs, including but not limited to legal fees, arising from or relating to your use of the Services, your violation of these Terms, or your infringement of any intellectual property or other rights of Teach Assist AI or any third party."
    },
    {
        title: "16. Governing Law and Jurisdiction",
        description: "These Terms shall be governed by and construed in accordance with the laws of Australia, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Australia for the resolution of any legal matter arising from or related to these Terms or your use of the Services. Notwithstanding this, you agree that Teach Assist AI shall still be allowed to apply for injunctive or other equitable relief in any court of competent jurisdiction."
    },
    {
        title: "17. Modifications to the Services",
        description: "Teach Assist AI reserves the right to modify, suspend, or discontinue the Services, in whole or in part, at any time, with or without notice to you. Teach Assist AI shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Services. You acknowledge and agree that Teach Assist AI may establish general practices and limits concerning the use of the Services, including but not limited to the maximum number of days that content will be retained, the maximum disk space allotted, and the maximum number of times you may access the Services in a given period."
    },
    {
        title: "18. Termination",
        description: "Teach Assist AI may terminate your access to and use of the Services, at its sole discretion, at any time and without notice to you, if you fail to comply with these Terms or for any other reason. Upon termination, all rights and licenses granted to you in these Terms will immediately cease, and you must cease all use of the Services. Teach Assist AI shall not be liable to you or any third party for termination of your access to the Services. Any provisions of these Terms that by their nature should survive termination shall survive termination, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability."
    },
    {
        title: "19. Dispute Resolution",
        description: "Any disputes arising out of or relating to these Terms or the Services shall be resolved through good faith negotiations between the parties. If the dispute cannot be resolved through negotiation, the parties agree to submit the dispute to binding arbitration under the rules of the Australian Centre for International Commercial Arbitration (ACICA). The arbitration shall be conducted in Australia, and the decision of the arbitrator shall be final and binding on both parties."
    },
    {
        title: "20. Force Majeure",
        description: "Teach Assist AI shall not be liable for any failure or delay in performing its obligations under these Terms due to circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, labor disputes, government actions, or interruptions in internet service."
    },
    {
        title: "21. Severability",
        description: "If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, such provision shall be severed from these Terms, and the remaining provisions shall remain in full force and effect. The parties agree to negotiate in good faith to replace any invalid or unenforceable provision with a valid and enforceable provision that achieves the original intent and economic effect of the invalid provision."
    },
    {
        title: "22. Entire Agreement",
        description: "These Terms, together with any other agreements or policies referenced herein, constitute the entire agreement between you and Teach Assist AI and supersede all prior or contemporaneous agreements, representations, or understandings, whether written or oral, relating to the subject matter of these Terms. No amendment or modification of these Terms shall be binding unless in writing and signed by both parties."
    },
    // {
    //     title: "Contact Information",
    //     description: `For any inquiries or concerns regarding these terms and conditions, please contact us at <a href=""> info@teachassistai.com</a>.`
    // }
]
const Terms = () => {
    return (
        <div className=' max-w-[1440px] mx-auto'>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Terms | Teach Assist AI</title>
            </Helmet>


            <h1 className='text-center text-4xl font-extrabold my-10'>
                Terms & Conditions
            </h1>
            <div className='flex justify-center'>
                <p className=' text-xl'>Effective Date: 25th August 2023</p>
            </div>
            <div className=' mx-5 md:mx-10 pt-20'>

                {
                    data.map((el, i) => (
                        <div className='mb-10'>

                            <h3 className='text-3xl font-semibold'>{el.title}</h3>
                            <p className='text-xl mt-5 mr-10 text-justify'>
                                <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: (el.description) }}>
                                </div>
                                {/* {el.description} */}
                            </p>
                        </div>
                    ))
                }

                <div className='mb-10'>

                    <h3 className='text-3xl font-semibold'>23. Contact Information</h3>
                    <p className='text-xl mt-5 mr-10 text-justify'>
                        If you have any questions about these Terms, please contact us at
                        <a href="/" className=' text-blue-500 underline ml-4'>
                            info@teachassistai.com
                        </a>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Terms