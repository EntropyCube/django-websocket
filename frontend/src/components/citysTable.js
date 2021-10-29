import React from "react";
import { DataGrid } from '@mui/x-data-grid';


function CitysTable(props){
    const columns = [{field:'city_name',headerName:'название города',width: 200, alignContent: "center"},
        {field:'temperature',headerName:'температура',width: 200, alignContent: "center"},
        {field:'humidity',headerName:'влажность',width: 200, alignContent: "center"},
        {field:'wind',headerName:'ветер',width: 200, alignContent: "center"},
        {field:'atmospheric_pressure',headerName:'атмосферное давление',width: 300, alignContent: "center"},
        
    ]
    const handleCellClick=(param,event)=>{
        props.cellClick(param)
    }

    return(
        <div style={{ height: 400, width: '80vw' }}>
                <DataGrid
                    
                    rows={props.data}
                    columns={columns}
                    pageSize={4}
                    rowsPerPageOptions={[1]}
                    autoPageSize={true}
                    disableColumnMenu={true}
                    hideFooterSelectedRowCount={true}
                    onCellClick={handleCellClick}
                />
            </div>
    )

}

export default CitysTable;