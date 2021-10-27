import React from "react";

function ListItems(props){
    return(
        <li>
        <a onClick={()=>props.clicked(props.reg)}>{props.reg}</a>
        </li>
    )
}

export default ListItems;