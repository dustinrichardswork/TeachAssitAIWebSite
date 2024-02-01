import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load your components
import Home from "./components/Home/Home";
import { UsageProvider } from "./context/UsageContext";
import HowItWorks from "./components/HowItWorks/HowItWorks";
// const LottieAnimation = lazy(() => import("./components/Home/Animation/LottieAnimation"))
// const LottieAnimation2 = lazy(() => import("./components/Home/Animation/LottieAnimation2"))
const Teachers = lazy(() => import("./components/Teacher/Teachers"));
const Affliate = lazy(() => import("./components/Afflisate/Affliate"));
const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const FAQ = lazy(() => import("./components/FAQ/FAQ"));
const Pricing = lazy(() => import("./components/Pricing/Pricing"));
const Privacy = lazy(() => import("./components/Privacy/Privacy"));
const Terms = lazy(() => import("./components/Terms/Terms"));
const CookiesPolicy = lazy(() => import("./components/Cookies/CookiesPolicy"));
const Signup = lazy(() => import("./components/Signup/Signup"));
const Login = lazy(() => import("./components/Login/Login"));
const ForgotPassword = lazy(() => import("./components/Password/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/Password/ResetPassword"));
const AdminDashboard = lazy(() => import("./components/Admin/Dashbaord/AdminDashboard"));
const UserDashboard = lazy(() => import("./components/Dashboard/UserDashboard"));
const Stories = lazy(() => import("./components/Blog/Stories/Stories"));
const DetailStory = lazy(() => import("./components/Blog/Stories/DetailStory"));
const Stripe = lazy(() => import("./components/Stripe/Payment"));
const Success = lazy(() => import("./components/Stripe/Success"));
const Cancel = lazy(() => import("./components/Stripe/Cancel"));
const YourComponent = lazy(() => import("./components/Pdf/YourComponent"));
const VerifyOTP = lazy(() => import("./components/OTP/VerifyOTP"));
const DonutChart = lazy(() => import("./components/Donut/DonutChart"));
const ContactSubmit = lazy(() => import("./components/Contact/ContactSubmit"));

export default function App() {

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Routes>

        <Route path="/" element={
          <Home />
        } />

        <Route path="/teachers" element={<Suspense fallback={<div>Loading...</div>}><Teachers /></Suspense>} />

        <Route path="/affliate" element={<Suspense fallback={<div>Loading...</div>}><Affliate /></Suspense>} />

        <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />

        <Route path="/contact" element={<Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>} />

        <Route path="/faq" element={<Suspense fallback={<div>Loading...</div>}><FAQ /></Suspense>} />

        <Route path="/pricing" element={<Suspense fallback={<div>Loading...</div>}>
          <UsageProvider>
            <Pricing />
          </UsageProvider>
        </Suspense>} />

        <Route path="/privacy" element={<Suspense fallback={<div>Loading...</div>}><Privacy /></Suspense>} />

        <Route path="/terms" element={<Suspense fallback={<div>Loading...</div>}><Terms /></Suspense>} />

        <Route path="/cookies-policy" element={<Suspense fallback={<div>Loading...</div>}><CookiesPolicy /></Suspense>} />

        <Route path="/signup" element={<Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>} />

        <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />

        <Route path="/password/forgot" element={<Suspense fallback={<div>Loading...</div>}><ForgotPassword /></Suspense>} />

        <Route path="/password/reset/:token" element={<Suspense fallback={<div>Loading...</div>}><ResetPassword /></Suspense>} />

        <Route path="/admin/dashboard/*" element={<Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense>} />

        <Route path="/user/dashboard/*" element={<Suspense fallback={<div>Loading...</div>}><UserDashboard /></Suspense>} />

        {/* <Route path="/blogs" element={<Blog />} /> */}

        <Route path="/blogs" element={<Suspense fallback={<div>Loading...</div>}><Stories /></Suspense>} />

        <Route exact path="/blog/:slug" element={<Suspense fallback={<div>Loading...</div>}><DetailStory /></Suspense>} />

        <Route path="/payment" element={<Suspense fallback={<div>Loading...</div>}><Stripe /></Suspense>} />

        <Route path="/success" element={<Suspense fallback={<div>Loading...</div>}><Success /></Suspense>} />

        <Route path="/cancel" element={<Suspense fallback={<div>Loading...</div>}><Cancel /></Suspense>} />

        <Route path="/pdf" element={<Suspense fallback={<div>Loading...</div>}><YourComponent /></Suspense>} />

        <Route path="/verify-otp" element={<Suspense fallback={<div>Loading...</div>}><VerifyOTP /></Suspense>} />

        <Route path="/donut" element={<Suspense fallback={<div>Loading...</div>}><DonutChart /></Suspense>} />

        <Route path="/contact-submitted" element={<Suspense fallback={<div>Loading...</div>}><ContactSubmit /></Suspense>} />

        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* <Route path="/animation" element={<LottieAnimation2 />} /> */}

        {/* <Route path="/tinyeditor" element={<TinyMCE />} /> */}


      </Routes>

      <Footer />

    </div>
  );
}