import React from 'react';
import AllTables from "../_components/tabs/AllTables";
import AllTeachers from "../_components/tabs/AllTeachers";
import Generate from "../_components/tabs/Generate";
import SpecificTable from "../_components/SpecificTable";

function MainArea({page, table}) {
    return (
        <div className={"h-full w-full p-3"}>
            {page === "generate" && <Generate/>}
            {page === "allTables" && <AllTables/>}
            {page === "allTeachers" && <AllTeachers/>}
            {table && <SpecificTable id={table}/>}
        </div>
    );
}

export default MainArea;