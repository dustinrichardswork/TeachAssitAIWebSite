import React from 'react'
import { Helmet } from 'react-helmet'


const data = [
    {
        title: '1. Introduction',
        description: `Teach Assist AI ("we," "us," "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information in accordance with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth), the General Data Protection Regulation (GDPR), and other applicable privacy laws and regulations.
        <br/>
        <br/>
        By accessing or using our services, you consent to the practices described in this Privacy Policy. If you do not agree with this Privacy Policy, please do not access or use our services.
        `
    },
    {
        title: '2. Personal Information We Collect',
        description: `
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Information You Provide: </b> We collect personal information that you voluntarily provide to us when you register for an account, subscribe to our services, or communicate with us. This information may include your name, email address, phone number, professional credentials, payment information, and other details relevant to our services.
        </li><br/>
        
        <li><b>Information from Other Sources:  </b>We may obtain information about you from other sources, such as educational institutions, partners, or third-party services, to enhance our ability to provide our services.

        </li><br/>

        <li><b>Sensitive Information:  </b> We may collect sensitive information, such as educational records or special categories of personal data, only where necessary for our services and with your explicit consent.
        </li><br/>
        </ul>
        `
    },
    {
        title: '3. How We Use Your Personal Information',
        description: `We use your personal information for various purposes, including but not limited to:
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Providing Our Services: </b> To register and manage your account, provide our AI-assisted teaching tools, process payments, and deliver customer support.
        </li><br/>
        
        <li><b>Improving Our Services:  </b>To analyze usage patterns, develop new features, and enhance the user experience.
        </li><br/>

        <li><b>Compliance and Legal Obligations:  </b> To comply with applicable laws, regulations, and legal processes, and to enforce our terms and conditions.

        </li><br/>

        <li><b>Marketing and Communication:   </b> To send you promotional materials, newsletters, and other communications, subject to your preferences and applicable laws.
        </li><br/>
        </ul>
        `
    },
    {
        title: '4. Disclosure of Personal Information',
        description: `We may disclose your personal information to:
        <br/>
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Service Providers:  </b>Third-party vendors, contractors, and other service providers who perform services on our behalf.
        </li><br/>
        
        <li><b>Educational Institutions and Partners: </b>Entities with whom we collaborate to provide our services, subject to confidentiality agreements.
        </li><br/>

        <li><b>Legal and Regulatory Authorities  </b> Government agencies, law enforcement, or other parties as required by law or in connection with legal proceedings.

        </li><br/>

        <li><b>Business Transfers:  </b> A buyer or successor in the event of a merger, acquisition, or other business transaction.
        </li><br/>
        </ul>
        `
    },
    {
        title: '5. International Data Transfers',
        description: `Teach Assist AI operates globally, and your personal information may be transferred to, stored, or processed in countries outside Australia, including countries within the European Economic Area (EEA). We take appropriate measures to ensure that your personal information is treated securely and in accordance with this Privacy Policy and applicable laws, including implementing standard contractual clauses or relying on adequacy decisions by the European Commission.
        `
    },
    {
        title: '6. Your Rights and Choices',
        description: `Under applicable privacy laws, you may have certain rights and choices regarding your personal information, including:
        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Access and Correction:   </b>You may request access to and correction of your personal information held by us.
        </li><br/>
        
        <li><b>Data Portability: </b>You may request the transfer of your personal information to another entity, where technically feasible.
        </li><br/>

        <li><b>Consent Withdrawal:  </b> You may withdraw your consent to our processing of your personal information at any time, without affecting the lawfulness of processing based on consent before withdrawal.
        </li><br/>

        <li><b>Complaints:  </b> You may lodge a complaint with a supervisory authority if you believe that our processing of your personal information violates applicable laws.
        </li><br/>
        </ul>
        `
    },
    {
        title: '7. Security of Personal Information',
        description: `We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect against unauthorized access, disclosure, alteration, or destruction. These measures may include encryption, access controls, secure transmission protocols, and regular security assessments.

        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Data Encryption: </b>We use encryption technologies to protect the confidentiality of your personal information during transmission and storage.
        </li><br/>
        
        <li><b>Access Controls </b>We restrict access to your personal information to authorized employees, contractors, and service providers who need to know that information to perform their job functions.

        </li><br/>

        <li><b>Breach Notification:   </b> In the event of a data breach that is likely to result in a high risk to your rights and freedoms, we will notify you and the relevant supervisory authorities as required by applicable laws.

        </li><br/>

        <li><b>User Responsibilities: </b>You are responsible for maintaining the confidentiality of your account credentials and for notifying us promptly if you suspect any unauthorized access to your account.

        </li><br/>
        </ul>
        `
    },
    {
        title: '8. Cookies and Tracking Technologies',
        description: `We may use cookies, web beacons, and other tracking technologies to collect information about your browsing behavior, preferences, and interactions with our services. Please refer to our Cookie Policy.
        `
    },
    {
        title: "9. Children's Privacy",
        description: `Teach Assist AI's services are not intended for individuals under the age of 18, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without verifiable parental consent, we will take steps to delete that information promptly..
        `
    },
    {
        title: '10. Third-Party Links and Services',
        description: `Our services may contain links to third-party websites, applications, or services that are not owned or controlled by Teach Assist AI. This Privacy Policy does not apply to the information practices of those third parties, and we encourage you to review their privacy policies and practices.

        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Third-Party Integrations: </b>We may offer integrations with third-party platforms or tools that may require you to share personal information with those third parties.
        </li><br/>
        
        <li><b>Social Media Features: </b> We may provide social media features that enable you to share content or interact with our services through social media platforms.
        </li><br/>

        <li><b>Disclaimer:   </b> We are not responsible for the content, privacy practices, or security of any third-party websites, applications, or services, and your use of them is at your own risk.
        </li><br/>
        </ul>
        `
    },
    {
        title: '11. Compliance with Australian Privacy Laws',
        description: `Teach Assist AI is committed to complying with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth) and other applicable privacy laws in Australia. The following provisions outline our practices in accordance with these laws:

        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Collection of Personal Information: </b>We collect personal information only when it is reasonably necessary for our functions and activities. We take reasonable steps to ensure that you are aware of the purposes for which we collect your information, the organizations to which we may disclose it, and any law that requires the collection.
        </li><br/>
        
        <li><b>Use and Disclosure: </b> We use and disclose personal information only for the purposes for which it was collected, or for related purposes that you would reasonably expect. We take reasonable steps to ensure that the information we disclose to others is accurate, up-to-date, complete, and relevant.
        </li><br/>

        <li><b>Access and Correction:   </b> You have the right to request access to and correction of your personal information held by us. We will respond to your request in a timely manner and in accordance with the APPs.
        </li><br/>

        <li><b>Security: </b> We take reasonable steps to protect your personal information from misuse, interference, loss, unauthorized access, modification, or disclosure.
        </li><br/>

        <li><b>Complaints: </b> If you have any concerns or complaints about our handling of your personal information, you may contact us using the contact information provided in this Privacy Policy. We will investigate your complaint and respond to you in accordance with the APPs.
        </li><br/>
        </ul>
        `
    },
    {
        title: '12. Compliance with the General Data Protection Regulation (GDPR)',
        description: `Teach Assist AI recognizes the importance of the General Data Protection Regulation (GDPR) for our users in the European Economic Area (EEA) and is committed to compliance with the GDPR. The following provisions outline our practices in accordance with this regulation:

        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Lawful Basis for Processing: </b> We process personal information based on lawful grounds, such as your consent, the performance of a contract, compliance with legal obligations, or our legitimate interests.
        </li><br/>
        
        <li><b>Individuals' Rights: </b> You have specific rights under the GDPR, including the right to access, rectify, erase, restrict, or object to the processing of your personal information, and the right to data portability.
        </li><br/>

        <li><b>Data Protection Officer: </b> We have designated a Data Protection Officer (DPO) responsible for overseeing our GDPR compliance. You may contact our DPO using the contact information provided in this Privacy Policy.
        </li><br/>

        <li><b>Cross-Border Transfers: </b> We comply with the GDPR requirements for transferring personal information outside the EEA, including implementing appropriate safeguards such as standard contractual clauses.
        </li><br/>

        <li><b>Supervisory Authorities: </b> If you believe that our processing of your personal information violates the GDPR, you have the right to lodge a complaint with a supervisory authority in the EEA.
        </li><br/>
        </ul>
        `
    },
    {
        title: '13. Changes to This Privacy Policy',
        description: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or other factors. We will provide notice of any material changes by posting the updated Privacy Policy on our website or by notifying you through other appropriate means.

        <br/>
        <ul style="padding-left: 3rem; list-style-type: lower-alpha;">
        <li><b>Effective Date: </b> The date at the top of this Privacy Policy indicates when it was last updated.
        </li><br/>
        
        <li><b>Your Continued Use: </b> Your continued use of our services after any changes to this Privacy Policy constitutes your acceptance of those changes.
        </li><br/>
        </ul>
        `
    },
]

const Privacy = () => {
    return (
        <div className=' max-w-[1440px] mx-auto'>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Terms | Teach Assist AI</title>
            </Helmet>


            <h1 className='text-center text-4xl font-extrabold my-10'>
                PRIVACY POLICY
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

                    <h3 className='text-3xl font-semibold'>
                        12. Contact Information
                    </h3>
                    <p className='text-xl mt-5 mr-10 text-justify'>
                        For any inquiries or concerns regarding these terms and conditions, please contact us at
                        <a href="/" className=' text-blue-500 underline ml-4'>
                            info@teachassistai.com
                        </a>
                    </p>
                    <p className='text-xl mt-5 mr-10 text-justify'>
                        You may also write to us at the physical address provided on our website or through any other contact methods made available by Teach Assist AI. Your privacy is important to us, and we value your trust and confidence in our commitment to safeguarding your personal information.

                    </p>
                </div>

            </div>
        </div>
    )
}

export default Privacy