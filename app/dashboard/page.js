import React from 'react';
import { auth } from "@clerk/nextjs";

async function DashboardPage() {
    const data = auth();
    return (
        <div>
            dashboard
        </div>
    );
}

export default DashboardPage;