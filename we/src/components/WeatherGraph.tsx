import React from "react";
import { useWeatherData } from "../store/useWeatherData";


const WeatherGraph: React.FC = () =>{
// const updateVader = useWeatherData((state: any) => state.updateVader);
//   Denna kallar på store och kollar vad som finns i den.
//   eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const vaderStore = useWeatherData((state: any) => state.vader)
//   console.log("hello" ,vaderStore);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anvandVaderData = useWeatherData((state: any) => state.vader)
console.log("DENNA", anvandVaderData);


  return <>
  <h1>DETTA ÄR GRAPH</h1>
  </>
}



export default WeatherGraph;