import React from 'react';
import { UserButton } from "@clerk/nextjs";

function DashboardPage(props) {
    return (
        <div>
            dashboard
            <UserButton afterSignOutUrl="/"/>
        </div>
    );
}

export default DashboardPage;