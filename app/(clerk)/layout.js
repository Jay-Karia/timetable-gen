import React from 'react';

function ClerkLayout({children}) {
    return (
        <div className={"h-full flex items-center justify-center"}>
            {children}
        </div>
    );
}

export default ClerkLayout;