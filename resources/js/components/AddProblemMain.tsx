import React from "react";
import AddProblem from "./AddProblem";
import AddTag from "./AddTag";
import AddCategory from "./AddCategory";

function AddPMain() {
    return(
        <div>
            <AddProblem />
            <AddTag />
            <AddCategory />
        </div>
    );
}

export default AddPMain;