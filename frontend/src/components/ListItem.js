import React from "react";

function ListItems(props){
    return(
        <li>
        <a onClick={()=>props.clicked(props.value)}>{props.value}</a>
        </li>
    )
}

export default ListItems;