import React from 'react';
import AllTables from "../_components/tabs/AllTables";
import AllTeachers from "../_components/tabs/AllTeachers";
import Generate from "../_components/tabs/Generate";

function MainArea({page, table}) {
    return (
        <div className={"h-full w-full p-3"}>
            {page === "generate" && <Generate/>}
            {page === "allTables" && <AllTables/>}
            {page === "allTeachers" && <AllTeachers/>}
            {/*{!page && <div className={"flex justify-center items-center h-full"}>*/}
            {/*    <h1 className={"text-2xl font-bold"}>Select a page from the sidebar</h1>*/}
            {/*</div>}*/}
            {table && <div className={"flex h-full"}>
                <h1 className={"text-xl font-bold"}>Table: {table}</h1>
            </div>}
        </div>
    );
}

export default MainArea;