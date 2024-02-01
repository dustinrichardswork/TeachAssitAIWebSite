import React from 'react'
import Layout from '../Layout'
import { useContext } from 'react'
import { UsageContext } from '../../../../context/UsageContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../../../../util/api'
import { UserContext } from '../../../../context/UserContext'

const DeleteAccount = () => {

  const navigate = useNavigate();
  const { usage } = useContext(UsageContext);
  const { setIsAuthenticated, setUser } = useContext(UserContext)

  const deleteAccount = async () => {
    // let check = confirm("Do you want to delete The Account?")
    // if (check) {
    try {
      const res = await api.delete(`/account`)
      toast("Account Successfuly Deleted");
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem("teachai_token")
      localStorage.removeItem("teachai_user")
      setIsAuthenticated(false)
      setUser(null);
      navigate('/')
    } catch (error) {
      console.log('Error While Deleting ACcount: ', error);
      toast("Error While Deleting Account")
    }
    // }
  }

  return (
    <Layout heading="My Subscription">
      <div>
        <p><span className=' text-2xl font-bold'>Access Level:</span> {usage?.plan} </p>
        <button onClick={deleteAccount} className=' bg-blue-600 py-3 px-5 rounded text-white mt-4' type='submit'>Account Deletion</button>
      </div>
    </Layout>
  )
}

export default DeleteAccount