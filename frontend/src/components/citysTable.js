import React from "react";
import { DataGrid } from '@mui/x-data-grid';


function CitysTable(props){
    const columns = [{field:'city_name',headerName:'название города',width: 200},
        {field:'temperature',headerName:'температура',width: 200},
        {field:'humidity',headerName:'влажность',width: 200},
        {field:'wind',headerName:'ветер',width: 200},
        {field:'atmospheric_pressure',headerName:'атмосферное давление',width: 300},
        
    ]
    // const headers=['название города',"температура","влажность","ветер","атмосферное давление"]
    const listdata=props.data.map((row, index) =>
        <li key={index}>
            {row.temperature}
        </li>
    );
    return(
        <ul>
            <div style={{height:400,width:'100',alignContent:'center'}}>
                <DataGrid
                    rows={props.data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[1]}
                    autoPageSize={true}
                    disableColumnMenu={true}
                    hideFooterSelectedRowCount={true}
                />
            </div>
        </ul>
    )

}

export default CitysTable;