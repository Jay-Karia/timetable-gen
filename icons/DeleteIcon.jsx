import React from 'react';

function DeleteIcon(props) {
    return (
    <>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={props.onClick}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    </>
    );
}

export default DeleteIcon;