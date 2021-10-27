import CitysTable from './components/citysTable'
import RegionsList from './components/regionsList'
import React, {useState, useEffect} from 'react';
import { w3cwebsocket } from 'websocket';


function App() {
  const [citysData, setcitysData]=useState([]);
  // const [regions,setRegions]=useState([]);
  // const [curRegion, setCurRegion]=useState("");
  // const [wsc,setWsc]=useState(null);
  


  useEffect(()=>{
    var client =new WebSocket('ws://127.0.0.1:8000/ws/regionsCity/');

    client.onopen=()=>console.log("connected home");
    client.onclose=()=>console.log("closed home");
     
    client.onmessage=(MessageEvent)=>{
      var tmp=JSON.parse(MessageEvent.data)
      var regs_city_data=tmp['regions_city_data']
      var BodyData=[]
      var updateRow
      regs_city_data.forEach((val,index) => {
        updateRow=val[0]["city_data"]
        updateRow["id"]=index
        BodyData.push(updateRow)
      });
      setcitysData(BodyData)
    }
    },[]);


  // useEffect(()=>{
  //   console.log('ahyet 1 use')
  //   var client =new WebSocket('ws://127.0.0.1:8000/ws/home/');

  //   client.onopen=()=>console.log("connected home");
  //   client.onclose=()=>console.log("closed home");
     
  //   client.onmessage=(MessageEvent)=>{
  //     var regs_array=JSON.parse(MessageEvent.data)
  //     var tmp=regs_array["regions"]
  //     regs_array=[]
  //     tmp.forEach(element => {
  //       regs_array.push(element)
  //     });
  //     setRegions(regs_array)
  //     console.log("regs array ",regs_array)
  //     // setWsc(new WebSocket('ws://127.0.0.1:8000/ws/regionsCity/'))
  //     client.close()
  //   }
  //   },[]);

  // useEffect(()=>{
  //     console.log("ya slegy za regionami blyat",regions)
  //     if (regions===[]){
  //       console.log("zashel v iskluchenit",regions)
  //       return
  //     } 

  //     console.log("ny pizda 2 use")
  //     const ws = new WebSocket('ws://127.0.0.1:8000/ws/regionsCity/');
  
  //     ws.onopen=()=>{
  //       // if (!ws) return;
  //       console.log("connected regions");
  //       if (curRegion =="") ws.close();
  //       console.log("ne srabotalo")
  //       console.log(curRegion)
  //       var msg=JSON.stringify(curRegion)
  //       console.log("msg= ", msg)
  //       ws.send(msg)
        
  //     }
  //     ws.onclose=()=>console.log("closed regions");
       
  //     ws.onmessage=(MessageEvent)=>{
  //       var tmp=JSON.parse(MessageEvent.data)
  //       var regs_city_data=tmp['regions_city_data']
  //       var BodyData=[]
  //       var updateRow
  //       regs_city_data.forEach((val,index) => {
  //         updateRow=val[0]["city_data"]
  //         updateRow["id"]=index
  //         BodyData.push(updateRow)
  //       });
  //       setcitysData(BodyData)
  //     }
  // },[curRegion,wsc]);


  // function clickOnRegion(region_name){
  //     setCurRegion({'current_region':region_name})
  // }


  return (
    <div >
      {/* <div style={{height:400,width:'100',alignContent:'center'}}>
        {regions.length?<RegionsList regions={regions} onclicked={clickOnRegion}/>:<p>Регионы отсутствуют</p>}
      </div> */}
      <div>
      {citysData.length?<CitysTable data={citysData}/>:<p>Выберите регион</p> }
      </div>
    </div>
  );
}

export default App;
