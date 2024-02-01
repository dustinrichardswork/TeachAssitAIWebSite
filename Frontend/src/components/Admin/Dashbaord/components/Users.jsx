import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { UsageContext } from '../../../../context/UsageContext'
import { toast } from 'react-toastify'
import api from '../../../../util/api'

const Users = () => {

  const { users, getAllUsers } = useContext(UserContext)
  const { usage } = useContext(UsageContext)

  const getExpiryDate = (dateStringFromBackend) => {

    // Parse the date string
    const originalDate = new Date(dateStringFromBackend);

    // Add 30 days to the date
    const newDate = new Date(originalDate);
    newDate.setDate(originalDate.getDate() + 30);

    // Create an array of month names
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    // Format the date in the desired format
    const formattedDate = `${newDate.getDate().toString().padStart(2, '0')} ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`;

    console.log(formattedDate); // Output: "07 September 2023"
    return formattedDate;
  }

  const handleCancel = async (userId, usageId) => {

    try {
      const { data } = await api.put('/plan/cancel', { userId, usageId })
      getAllUsers();
    } catch (error) {
      console.log('Error: ', error);
      toast("Error While canceling the Plan")
    }

    console.log('User ID: ', userId);
    console.log('Usage ID: ', usageId);
  }

  const handleDelete = async (userId, usageId) => {

    try {
      const { data } = await api.delete(`/admin/users/${userId}`)
      toast('User deleted Successfully')
      getAllUsers();
    } catch (error) {
      console.log('Error: ', error);
      toast("Error While Deleting the Plan")
    }

    console.log('User ID: ', userId);
    console.log('Usage ID: ', usageId);
  }
  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b text-start">Plan</th>
            <th className="py-2 px-4 border-b">Usage</th>
            <th className="py-2 px-4 border-b">Expiry Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((el, index) => (
            <tr key={el._id} className='text-center'>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{el.user?.firstName}</td>
              <td className="py-2 px-4 border-b">{el.user?.lastName}</td>
              <td className="py-2 px-4 border-b">{el.user?.email}</td>
              <td className="py-2 px-4 border-b">{el.user?.role}</td>
              <td className="py-2 px-4 border-b text-start">
                {el.plan}
              </td>
              <td className="py-2 px-4 border-b">
                {el.usageCount}
                /
                {el.usageLimit === null ? 'Unlimited' : el?.usageLimit}

              </td>
              <td className="py-2 px-4 border-b">{el?.paymentDate ? getExpiryDate(el?.paymentDate) : '-'}</td>
              <td className='py-2 px-4 border-b'>
                {
                  (['Starter', 'Professional'].includes(el?.plan)) && (
                    <button className=' bg-blue-400 px-2 rounded text-sm text-white'
                      onClick={() => handleCancel(el?.user?._id, el._id)}
                    >Cancel</button>
                  )
                }
              </td>
              <td className='py-2 px-4 border-b'>
                {
                  <button className=' bg-blue-400 px-2 rounded text-sm text-white'
                    onClick={() => handleDelete(el?.user?._id, el._id)}
                  >Delete</button>

                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default Users