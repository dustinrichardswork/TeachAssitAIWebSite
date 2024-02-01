import React, { createContext, useState } from 'react';
import api from '../util/api';
import { toast } from 'react-toastify';

export const UsageContext = createContext();

export const UsageProvider = ({ children }) => {

    const [usage, setUsage] = useState(null);
    const [creditWidth, setCreditWidth] = useState(0)
    const [uploadBarWidth, setUploadBarWidth] = useState(0)

    const fetchUsage = async () => {
        try {
            const { data } = await api.get('/getUsage');
            const { usage } = data
            setUsage(usage)
            // console.log('Usage: ', usage);
            let width = Math.floor(((usage?.usageCount) * 100) / usage?.usageLimit)
            let upload = Math.floor(((usage?.noOfFilesUploaded) * 100) / usage?.noOfFilesUploadedLimit)
            setCreditWidth(width);
            setUploadBarWidth(upload)
        } catch (error) {
            // toast("Error Usage Data")
        }
    }

    return (
        <UsageContext.Provider value={{ usage, creditWidth, uploadBarWidth, fetchUsage }}>
            {children}
        </UsageContext.Provider>
    );
};