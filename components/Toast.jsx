import React from 'react';
import {Toaster} from "react-hot-toast";

function Toast({type, message}) {
    const toast = {
        error: (message) => toast.error(message, {
            style: {
                border: '1px solid #2a0202',
                color: '#9b1515',
            },
            iconTheme: {
                primary: '#9b1515',
                secondary: '#FFFAEE',
            },
        }),
        success: (message) => toast.success(message, {
            style: {
                border: '1px solid #022a09',
                color: '#054b11',
            },
            iconTheme: {
                primary: '#054b11',
                secondary: '#FFFAEE',
            },
        }),
        loading: (message) => toast.success(message, {
            icon: '⭕',
            style: {
                border: '1px solid #713200',
                color: '#713200',
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
        }),
    }
    return (
        <div>
            <Toaster position={"bottom-right"}/>
        </div>
    );
}

export default Toast;