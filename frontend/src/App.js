import React, {Component,useState,useEffect} from 'react';
import {w3cwebsocket} from 'websocket';



var client = new w3cwebsocket('ws://127.0.0.1:8000/ws/home/');

function App() {

  var [regions,setRegions]=useState([])
  var citys
  
  client.onopen=()=>{
    console.log('connected')
  }

  client.onmessage=(message)=>{
    var regs_array=JSON.parse(message.data)
    console.log(typeof(regs_array))

    setRegions(regs_array)
    console.log(regions)
  }
  

  function listregions(props){
      var regs=props.regions
      var listreg=regs.map((reg)=>(
        <li>{reg}</li>
      ))
      return <ul>{listreg(regions)}</ul>
  }

  

  return (
    <div className="App">
     
       <div >
       {regions.map((region)=>{
        return <li>{region}</li> 
       })
       }
         {regions}
       </div>
       <div>
        <button onClick={listregions}>reload</button>
       </div>
     
    </div>
  );
}

export default App;
