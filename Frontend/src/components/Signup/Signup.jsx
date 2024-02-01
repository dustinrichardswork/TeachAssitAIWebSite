import React, { useContext, useState } from "react";


import './DisabledButton.css';
import './signup.css';

// import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

// import login from '../../images/check.webp'
import image from '../../images/Edited/webp/login.jpeg'
import SignupLoader from "../commons/SignupLoader";
import { Link } from "react-router-dom";

export default function Signup() {

  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  const { register } = useContext(UserContext);


  // Initialize state using the useState hook
  const [allow, setAllow] = useState(false);


  // Function to update the 'allow' state
  const handleCheckboxChange = () => {
    setAllow(!allow);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get('password') !== formData.get('password1')) {
      console.log("Password doesn't match");
      alert("Passowor is not matched!")
      return
    }

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    setLoading(true);
    register(data, setLoading)
  };

  return (

    <div className="md:h-[80vh] flex md:justify-center md:items-center" style={{
      backgroundImage: `url(${image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <div className=" max-w-[60rem] md:rounded-[1.5rem] bg-white"
        style={{
          // boxShadow: '0px 2px 45px -11px rgba(0,0,0,0.5)',
        }
        }
      >
        <form
          onSubmit={handleSubmit}
          className="m-12"
        >
          <div className="flex flex-col md:flex-row gap-5">

            <div className=" flex-1 flex flex-col gap-2">
              <label htmlFor="firstName">
                First Name <span className=" text-red-500 text-xl">*</span>
              </label>
              <input
                name="firstName"
                id="firstName"
                className="bg-transparent border h-10 px-3 rounded"
                required
              />
            </div>

            <div className=" flex-1 flex flex-col gap-2">
              <label htmlFor="firstName">
                Last Name <span className=" text-red-500 text-xl">*</span>
              </label>
              <input
                name="lastName"
                id="lasstName"
                className="bg-transparent border h-10 px-3 rounded text-black"
                required
              />
            </div>

          </div>

          <div className="flex-1 flex flex-col gap-2 my-7">

            <label htmlFor="email">
              Email Address <span className=" text-red-500 text-xl">*</span>
            </label>
            <input
              required
              id="email"
              name="email"
              className="asterisk_required_field bg-transparent border h-10 px-3 rounded text-black"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="password">
                Password <span className=" text-red-500 text-xl">*</span>
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="bg-transparent border h-10 px-3 rounded text-black"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="password1">
                Re-Password <span className=" text-red-500 text-xl">*</span>
              </label>
              <input

                name="password1"
                type="password"
                id="password1"
                className="bg-transparent border h-10 px-3 rounded text-black"
                required
              />
            </div>
          </div>
          <div className="flex items-start gap-2 my-7">
            <input type="checkbox" id="terms" className=" h-5 w-5" onChange={handleCheckboxChange} />
            <label htmlFor="terms">
              I agree to the

              <Link to="/terms" className=" mx-1 text-blue-400 underline">
                Terms and Conditions,
              </Link>
              <Link to="/privacy" className=" mx-1 text-blue-400 underline">
                Privacy Policy
              </Link>
              , and
              <Link to="/cookies-policy" className=" mx-1 text-blue-400 underline">
                Cookie Policy
              </Link>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              disabled={!allow}
              className={`${!allow ? 'disabled-button' : ''} relative border-2 border-primary bg-primary text-white hover:text-secodnary hover:bg-secondary px-5 py-3 rounded`}>
              {
                loading &&
                <div className=" absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                  <SignupLoader />
                </div>
              }
              Sign Up
            </button>

          </div>
        </form>
      </div>
    </div>

  );
}
