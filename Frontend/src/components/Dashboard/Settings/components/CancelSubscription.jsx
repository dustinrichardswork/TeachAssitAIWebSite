import React from 'react'
import Layout from '../Layout'
import { useContext } from 'react'
import { UsageContext } from '../../../../context/UsageContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../../../../util/api'
import { UserContext } from '../../../../context/UserContext'

const CancelSubscription = () => {

  const navigate = useNavigate();
  const { usage } = useContext(UsageContext);
  const { setIsAuthenticated, setUser } = useContext(UserContext)

  const cancelSubscription = async () => {
    // let check = confirm("Do you want to delete The Account?")
    // if (check) {
    try {
      const res = await api.delete(`/payment/cancel-subscription`)
      toast("Successfully Unsubscribed");
      // delete api.defaults.headers.common['Authorization'];
      // localStorage.removeItem("teachai_token")
      // localStorage.removeItem("teachai_user")
      // setIsAuthenticated(false)
      // setUser(null);
      // navigate('/')
    } catch (error) {
      console.log('Error While Unsubscribing: ', error);
      toast("Error While Unsubscribing")
    }
    // }
  }

  return (
    <Layout heading="Cancel Subscription">
      <div>
        {/* <p><span className=' text-2xl font-bold'>Access Level:</span> {usage?.plan} </p> */}
        <button onClick={cancelSubscription} className=' bg-blue-600 py-3 px-5 rounded text-white mt-4' type='submit'>Cancel Subscription</button>
      </div>
    </Layout>
  )
}

export default CancelSubscription