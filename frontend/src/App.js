import CitysTable from "./components/citysTable";
import CityChart from "./components/chartComponent";
import RegionsList from "./components/regionsList";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import ComboBox from "./components/regionsComboList";
import { display } from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@material-ui/core";

function App() {
  const [regions, setRegions] = useState([]);
  const [citysData, setcitysData] = useState([]);
  const [curRegion, setCurRegion] = useState("");
  const [curCity, setCurCity] = useState();
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [loadWeather, setLoadWeather] = useState(false);

  useEffect(() => {
    let client = new WebSocket("ws://127.0.0.1:8000/ws/home/");

    client.onopen = () => console.log("connected home");
    client.onclose = () => console.log("closed home");

    client.onmessage = (MessageEvent) => {
      let regs_array = JSON.parse(MessageEvent.data);
      let tmp = regs_array["regions"];
      regs_array = [];
      tmp.forEach((element) => {
        regs_array.push(element);
      });
      setRegions(regs_array);
      client.close();
    };
  }, []);

  useEffect(() => {
    receiveData();
  }, [curRegion]);

  useEffect(() => {
    receiveCityData();
  }, [curCity]);

  function receiveData() {
    let ws = new WebSocket("ws://127.0.0.1:8000/ws/regionsCity/");
    ws.onopen = () => {
      let msg = JSON.stringify(curRegion);
      ws.send(msg);
    };
    ws.onclose = () => console.log("closed regions");

    ws.onmessage = (MessageEvent) => {
      let tmp = JSON.parse(MessageEvent.data);
      let regs_city_data = tmp["regions_city_data"];
      let BodyData = [];
      let updateRow;
      regs_city_data.forEach((val, index) => {
        updateRow = val[0]["city_data"];
        updateRow["id"] = index;
        BodyData.push(updateRow);
      });
      setcitysData(BodyData);
      setLoadWeather(false);
    };
  }

  function receiveCityData() {
    let wsc = new WebSocket("ws://127.0.0.1:8000/ws/getCityParams/");
    wsc.onopen = () => {
      let msg = JSON.stringify(curCity);
      wsc.send(msg);
    };
    wsc.onclose = () => console.log("closed citys Consumer");

    wsc.onmessage = (MessageEvent) => {
      let tmp = JSON.parse(MessageEvent.data);
      let city_chart_data = tmp["city_chart_data"];
      console.log(city_chart_data);
      setChartOptions(city_chart_data[1]);
      setChartSeries(city_chart_data[0]);
      console.log("cur city",curCity);
      console.log("chartoptions ",chartOptions)
      console.log("charseries ",chartSeries)
      wsc.close();
    };
  }

  function clickOnRegion(region_name) {
    setCurRegion({ current_region: region_name });
    setLoadWeather(true);
  }

  function clickOnCity(params) {
    setCurCity([
      { city: params["row"]["city_name"] },
      { parameter: params["field"] },
    ]);
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={regions.length == 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header />
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" m={2}>
          <ComboBox regionsArray={regions} onclicked={clickOnRegion} />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: 400, width:"80vw"}}
        >
          <div style={{ display: "flex" }}>
            {loadWeather ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : citysData.length ? (
              <CitysTable data={citysData} cellClick={clickOnCity} />
            ) : (
              <p>Выберите регион</p>
            )}
          </div>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 400, width:"80vw"}}>
          <div>
            {chartSeries.length ? (
              <CityChart
                chartOptions={chartOptions}
                chartSeries={chartSeries}
                chartParam={curCity[1]["parameter"]}
              />
            ) : (
              <p>Выберите город</p>
            )}
          </div>
        </Box>
      </Container>
    </>
  );
}

export default App;
