import React from 'react'

import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import DeleteAccount from './components/DeleteAccount';
import CancelSubscription from './components/CancelSubscription';
import ChangeEmail from './components/ChangeEmail';
import TwoFA from './components/TwoFA';
import { UsageContext } from '../../../context/UsageContext';
import { useContext } from 'react';

const Settings = () => {

    const { usage } = useContext(UsageContext);

    return (
        <div>
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-5'>
                <Profile />
                <TwoFA />
                <ChangePassword />
                <ChangeEmail />
                <DeleteAccount />
                {
                    usage?.payment && (
                        <CancelSubscription />
                    )
                }
            </div>
        </div>
    )
}

export default Settings