import React from 'react'
import Layout from '../Layout';

import api from '../../../../util/api'
import { useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { toast } from 'react-toastify';

const TwoFA = () => {

  const { user, getUserData } = useContext(UserContext);

  const handleTwoFA = async (enabled) => {

    try {
      const { data } = await api.put('/enable-2fa', { enabled })
      let message =  enabled ? "2FA is Enabled" : "2FA is Disabled"
      toast(message)
      getUserData()
    } catch (error) {
      toast("error while 2fa")
    }
    console.log('change 2fa');
  }

  return (
    <Layout heading="Secure Your Account">
      <div>
        <p className="text-xl font-['Poppins']">Two-factor authentication adds an extra layer of security to your account. To log in, in addition you'll need to provide a 6 digit code.</p>

        <div className="flex gap-5">
          <button className=' bg-blue-600 py-3 px-5 rounded text-white mt-4' type='submit'>Enable 2FA</button>
          <button onClick={() => handleTwoFA(true)} className=' border-2 border-blue-600 py-3 px-5 rounded mt-4' type='submit'>Yes</button>
          <button onClick={() => handleTwoFA(false)} className=' border-2 border-blue-600 py-3 px-5 rounded mt-4' type='submit'>No</button>
        </div>
        <div>
          Status: {user?.TwoFA ? "Yes" : "No"}
        </div>
      </div>
    </Layout>
  )
}

export default TwoFA