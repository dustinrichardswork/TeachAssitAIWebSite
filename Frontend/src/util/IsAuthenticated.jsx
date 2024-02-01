import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext';

const IsAuthenticated = () => {

    const { isLoggedin } = useContext(UserContext)

    useEffect(() => {
        isLoggedin()
    }, [])

    return null;
}

export default IsAuthenticated
