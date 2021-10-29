
import React from "react";
import ListItems from './ListItem';

function RegionsList(props){

    return(
        <ul>
        {props.regionsArray.map((reg,index)=>{
           return <ListItems key={index} value={reg} clicked={props.onclicked}/> 
        })}
        </ul>
    )
}

export default RegionsList;