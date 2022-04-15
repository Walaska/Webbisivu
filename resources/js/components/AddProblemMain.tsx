import React from "react";
import AddProblem from "./AddProblem";
import AddTag from "./AddTag";
import AddCategory from "./AddCategory";
import AddKpi from "./AddKpi";
import Delete from "./DeleteStuff";

function AddPMain() {
    return(
        <div>
            <AddProblem />
            <AddTag />
            <AddCategory />
            <AddKpi />
            <Delete />
        </div>
    );
}

export default AddPMain;