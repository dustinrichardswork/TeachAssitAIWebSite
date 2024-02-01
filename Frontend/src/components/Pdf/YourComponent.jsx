import React, { useContext } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { UserContext } from '../../context/UserContext';
import PDFDocument from './PDFDocument'

const YourComponent = () => {

    const { pdfAnswer} = useContext(UserContext)

    return (
        <div>

            <PDFViewer style={{ width: '100%', height: '90vh' }}>
                <PDFDocument answer={pdfAnswer} />
            </PDFViewer>
        </div>
    );
};

export default YourComponent;
