
import React from "react";
import ListItems from './ListItem';

function RegionsList(props){

    const listRegions=props.regions.map((reg,index)=>{
        console.log("cho proishodit ",reg,index);
        <ListItems key={index} value={reg} clicked={props.onclicked} />
    });

    return(
        <ul>
        {listRegions}
        </ul>
    )
}

export default RegionsList;