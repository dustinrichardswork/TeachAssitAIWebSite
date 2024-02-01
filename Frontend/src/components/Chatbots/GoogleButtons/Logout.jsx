import React from 'react'
import { GoogleLogout } from "react-google-login"

const clientId = '701706349964-qs7l3rc6td3anqm53l8r04ib83aaqdh7.apps.googleusercontent.com'

const Logout = () => {

    const onSuccess = () => {
        console.log('Logout Successful!');
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout