import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import './styles.css';
import Lottie from 'react-lottie';
// import animationData from '../../../animation/iPad/mobile.json'

export default function LottieAnimation({ animationData }) {
  const [defaultOptions, setDefaultOptions] = useState(null);

  useEffect(() => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    setDefaultOptions(defaultOptions)
  }, [])


  return (
    <div className=' shadow-lg'>
      {
        defaultOptions && (
          <Lottie
            options={defaultOptions}
          />
        )
      }
    </div>
  );
}