import React from "react";
import {Tabs, Tab, Button, ButtonGroup} from "@nextui-org/react";

function SideBar() {
    return (
        <div className={"border-b lg:h-full pl-4 flex gap-4 flex-col lg:flex-row"}>
            <div className={"border-r py-4 pr-4 gap-4 flex lg:flex-col lg:w-unit-80 justify-center lg:justify-start"}>
                    <Button color={"primary"} variant={"flat"}>Generate</Button>
                    <Button color={"primary"} variant={"flat"}>All Tables</Button>
                    <Button color={"primary"} variant={"flat"}>All Teachers</Button>
            </div>
        </div>
    );
}

export default SideBar;