import React from "react";
import { useWeatherData } from "../store/useWeatherData";
import {
  ResponsiveContainer,
  XAxis,
  BarChart,
  CartesianGrid,
  Tooltip,
  Bar,
  YAxis,
} from "recharts";


const WeatherGraph: React.FC = () =>{

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anvandVaderData = useWeatherData((state: any) => state.vader)
console.log("DENNA", anvandVaderData);
const { main: { temp_max = 0, temp_min = 0, feels_like = 0  } = {} } = anvandVaderData || {};


const taBortDecimal = (value: number) => {
  return Math.floor(value);
};



return (
  <>
    {temp_max && temp_min && feels_like && (
      <>
        <h1>Temperatur över dagen.</h1>
        {/* <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={[anvandVaderData]} width={500} height={300}>
            <XAxis dataKey="main" />
            <Line dataKey="main.temp_max" />
            <Line dataKey="main.temp_min" stroke="#82ca9d" />
            <Line dataKey="main.feels_like" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer> */}

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            
            data={[anvandVaderData]} // Använd hela användardata-objektet som datakälla
            margin={{
              top: 10,
              left: 20,
              right: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickCount={10} interval={0} />
            <Tooltip />
            <Bar
              dataKey="main.temp_max"
              fill="#ff7300"
              label={{ fontSize: 30, fill: "#fff", formatter: taBortDecimal}}
            />
            <Bar
              dataKey="main.temp_min"
              fill="#82ca9d"
              label={{ fontSize: 30, fill: "#fff", formatter: taBortDecimal }}
            />
            <Bar
              dataKey="main.feels_like"
              fill="#888fab"
              label={{ fontSize: 30, fill: "#fff", formatter: taBortDecimal }}
            />
          </BarChart>
        </ResponsiveContainer>
      </>
    )}
  </>
);
}



export default WeatherGraph;