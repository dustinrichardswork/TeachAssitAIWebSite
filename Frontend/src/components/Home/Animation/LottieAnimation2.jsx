import React, { useEffect, useState } from 'react';
// import './styles.css';
import Lottie from 'react-lottie';
// import animationData from '../../../animation/iPad/descktop.json'

export default function LottieAnimation2({ animationData }) {

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
    <div className=''>
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