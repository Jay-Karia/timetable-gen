"use client"
import React from "react";
import {Tabs, Tab, Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";

function SideBar() {
    const router = useRouter()

    const buttons = [
        {title: "Generate", color: "primary", variant: "flat", page: "generate"},
        {title: "All Tables", color: "primary", variant: "flat", page: "allTables"},
        {title: "All Teachers", color: "primary", variant: "flat", page: "allTeachers"},
    ]
    return (
        <div className={"border-b lg:h-full pl-4 flex gap-4 flex-col lg:flex-row"}>
            <div className={"border-r py-4 pr-4 gap-4 flex lg:flex-col lg:w-unit-80 justify-center lg:justify-start"}>
                {buttons.map((btn)=> (
                    <Button key={btn.page} color={btn.color} variant={btn.variant} onClick={()=> {
                        const url = `/dashboard?page=${btn.page}`
                        router.push(url)
                    }}>{btn.title}</Button>
                ))}
            </div>
        </div>
    );
}

export default SideBar;