import React, { useContext, useEffect } from 'react'
import Aside from './Aside'
import Users from './components/Users'
import { UserContext } from '../../../context/UserContext'
import { Route, Routes } from 'react-router-dom'
import AddStory from './components/AddStory'
import EditStory from './components/EditStory'
import { UsageProvider } from '../../../context/UsageContext'
import Settings from '../../Dashboard/Settings/Settings'

const AdminDashboard = () => {

    const { user, isAuthenticated, getAllUsers } = useContext(UserContext)

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <UsageProvider>
            <div className=' max-w-[1440px] mx-auto'>
                {

                    isAuthenticated ? (

                        (user?.role === 'admin') ? (
                            <div className="relative min-h-[80vh] overflow-hidden flex flex-col md:flex-row">

                                <Aside />

                                <main className=" mt-40 md:mt-0 max-h-screen overflow-auto flex-1">
                                    <div className="px-2 md:px-6 py-8">
                                        <Routes>
                                            <Route index path='users' element={<Users />} />
                                            {/* <Route path='post/new' element={<AddPost />} /> */}
                                            <Route path='post/new' element={<AddStory />} />
                                            <Route path='story/:slug/edit' element={<EditStory />} />
                                            <Route path={`settings`} element={<Settings />} />
                                        </Routes>
                                    </div>
                                </main>
                            </div>
                        ) : (
                            <div>Loading</div>
                        )

                    ) : (
                        <div>Loading</div>
                    )
                }
            </div>
        </UsageProvider>
    )
}

export default AdminDashboard