"use client"

import React from 'react';
import SideBar from "../dashboard/_components/SideBar";
import MainArea from "../dashboard/_components/MainArea";
import {useSearchParams} from "next/navigation";

function DashboardPage({searchParams}) {
    return (
        <div className={"h-full lg:flex"}>
            <SideBar/>
            <MainArea page={searchParams.page}/>
        </div>
    );
}

export default DashboardPage;