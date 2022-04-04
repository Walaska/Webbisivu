import React from "react";
import AddProblem from "./AddProblem";
import AddTag from "./AddTag";
import AddCategory from "./AddCategory";
import AddKpi from "./AddKpi";

function AddPMain() {
    return(
        <div>
            <AddProblem />
            <AddTag />
            <AddCategory />
            <AddKpi />
        </div>
    );
}

export default AddPMain;