import React from 'react';
import {auth} from "@clerk/nextjs";
import SideBar from "../dashboard/_components/SideBar";
import {Tab, Tabs} from "@nextui-org/react";

async function DashboardPage() {
    const data = auth();
    return (
        <div className={"h-full"}>
            <SideBar/>
        </div>
    );
}

export default DashboardPage;