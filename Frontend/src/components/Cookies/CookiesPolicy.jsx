import React from 'react'
import { Helmet } from 'react-helmet'


const data = [
    {
        title: '1. What Are Cookies?',
        description: `Cookies are small text files that are stored on your device (computer, smartphone, tablet, etc.) when you visit a website. They contain information that helps websites remember your preferences, authenticate your sessions, and provide personalized content.
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Session Cookies:</b> These are temporary cookies that are deleted when you close your browser. They are used to remember your actions during a single browsing session.
        </li><br/>
        
        <li><b>Persistent Cookies:  </b>These cookies remain on your device for a specified period or until you delete them. They are used to remember your preferences across multiple browsing sessions.
        </li><br/>

        <li><b>First-Party Cookies:  </b> These cookies are set by the website you are visiting and can only be read by that site.
        </li><br/>

        <li><b>Third-Party Cookies:  </b> These cookies are set by a domain other than the one you are visiting and are used for cross-site tracking, advertising, and analytics.
        </li>
        </ul>
        `
    },
    {
        title: '2. How We Use Cookies',
        description: `We use cookies for various purposes, including:
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Authentication:</b> To verify your identity and maintain your logged-in status across sessions.
        </li><br/>
        
        <li><b>Personalization:  </b>To remember your preferences, language settings, and other customization options.
        </li><br/>

        <li><b>Security:  </b> To protect against fraudulent activities, unauthorized access, and other security risks.
        </li><br/>

        <li><b>Analytics: </b> To collect statistical data about user behavior, website performance, and the effectiveness of our marketing campaigns.
        </li><br/>

        <li><b> Advertising: </b> To deliver targeted advertisements, manage ad frequency, and measure the success of advertising efforts.
        </li><br/>
        </ul>
        `
    },
    {
        title: '3. Types of Cookies We Use',
        description: `We categorize the cookies we use into the following types:
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Strictly Necessary Cookies: </b> These cookies are essential for the basic functionality of our website and cannot be disabled. They include cookies for security, accessibility, and session management.
        </li><br/>
        
        <li><b>Performance Cookies: </b>These cookies collect information about how you use our website, such as pages visited, load times, and error messages. They help us identify areas for improvement.
        </li><br/>

        <li><b>Functional Cookies:  </b> These cookies enable enhanced functionality and personalization, such as remembering your preferences and providing interactive features.
        </li><br/>

        <li><bTargeting/Advertising Cookies:  </b> These cookies are used to deliver relevant advertisements, track ad performance, and limit the number of times you see the same ad.
        </li><br/>

        <li><b> Social Media Cookies: </b> : These cookies enable social media features, such as sharing content and connecting with our social media profiles
        </li><br/>
        </ul>
        `
    },
    {
        title: '4. Managing Your Cookie Preferences',
        description: `You have the right to accept, reject, or manage the cookies used on our website. Here's how you can exercise your preferences:
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Browser Settings: </b> Most web browsers allow you to manage cookies through the browser settings. You can choose to block all cookies, accept only certain types, or receive a notification when a website wants to set a cookie. Please refer to your browser's help documentation for specific instructions.
        </li><br/>
        
        <li><b>Third-Party Tools: </b>Various third-party tools and browser extensions are available to help you manage cookies and other tracking technologies.
        </li><br/>

        <li><b>Opt-Out Links:  </b> For some third-party cookies, especially those related to advertising and analytics, you may find opt-out links or mechanisms provided by the respective third-party providers.
        </li><br/>

        <li><b>Consent Management:  </b> We may provide a cookie consent banner or other tools on our website to allow you to selectively accept or reject specific types of cookies.
        <br/>
        <br/>
        Please note that disabling certain cookies may affect the functionality and features of our website and services.
        </li><br/>
        </ul>
        `
    },
    {
        title: '5. Changes to This Cookie Policy',
        description: `We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. We will provide notice of any material changes by posting the updated Cookie Policy on our website or by notifying you through other appropriate means:
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Effective Date: </b> The date at the top of this Cookie Policy indicates when it was last updated.

        </li><br/>
        
        <li><b>Your Continued Use:  </b>Your continued use of our website and services after any changes to this Cookie Policy constitutes your acceptance of those changes.
        </li><br/>
        </ul>
        `
    }
]

const CookiesPolicy = () => {
    return (
        <div className=' max-w-[1440px] mx-auto'>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Terms | Teach Assist AI</title>
            </Helmet>


            <h1 className='text-center text-4xl font-extrabold my-10'>
                COOKIE POLICY
            </h1>
            <div className='flex justify-center'>
                <p className=' text-xl'>Effective Date: 25th August 2023</p>
            </div>
            <p className=' text-xl'>Teach Assist AI ("we," "us," "our") uses cookies and similar tracking technologies on our website and services to enhance user experience, analyze usage, deliver personalized content, and support our marketing efforts. This Cookie Policy explains what cookies are, how we use them, the types of cookies we use, and how you can manage your preferences.</p>

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

                    <h3 className='text-3xl font-semibold'>6. Contact Us</h3>
                    <p className='text-xl mt-5 mr-10 text-justify'>
                        If you have any questions, concerns, or comments about this Cookie Policy or our cookie practices, please do not hesitate to contact us:
                        <a href="/" className=' text-blue-500 underline ml-4'>
                            info@teachassistai.com
                        </a>
                    </p>
                    <p className='text-xl mt-5 mr-10 text-justify'>
                        You may also write to us at the physical address provided on our website or through any other contact methods made available by Teach Assist AI.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default CookiesPolicy