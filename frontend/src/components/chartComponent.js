import React from "react";
import { Line } from "react-chartjs-2"




function CityChart(props){
  const data ={
    labels:props.chartOptions,
    datasets:[{
      label: "Средние суточные значения "+props.chartParam,
      data: props.chartSeries,
      fill: false,
      borderColor: "#742774"}
    ]}

    return(
    <div style={{ height: 400, width: '80vw' }}>
      <Line data={data}/>
    </div>
    )
}

export default CityChart;