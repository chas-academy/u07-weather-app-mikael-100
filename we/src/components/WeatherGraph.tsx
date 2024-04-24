import React from "react";
import { useWeatherData } from "../store/useWeatherData";
import {
  ResponsiveContainer,
  XAxis,
  BarChart,
  Tooltip,
  Bar,
  YAxis,
} from "recharts";


const WeatherGraph: React.FC = () =>{

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anvandVaderData = useWeatherData((state: any) => state.vader)
console.log("DENNA", anvandVaderData);

// Utbrytning av variabler från Objectet anvandVaderData

const { main: { temp_max = 0, temp_min = 0, feels_like = 0  } = {} } = anvandVaderData || {};


const taBortDecimal = (value: number) => {
  return Math.floor(value);
};



return (
  <>
    {temp_max && temp_min && feels_like && (
      <>
        <h1>Temperatur över dagen.</h1>

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
            <XAxis dataKey="name" />
            <YAxis tickCount={0} interval={0} />
            <Tooltip contentStyle={{ backgroundColor: "#4A5566" }} />
            <Bar
              dataKey="main.temp_max"
              name="Max"
              fill="#ff7300"
              radius={[10, 10, 0, 0]}
              label={{ fontSize: 30, fill: "#fff", formatter: taBortDecimal }}
              animationDuration={2000}
            />
            <Bar
              dataKey="main.temp_min"
              name="Min"
              fill="#82ca9d"
              radius={[10, 10, 0, 0]}
              label={{ fontSize: 30, fill: "#fff", formatter: taBortDecimal }}
              animationDuration={2000}
            />
            <Bar
              dataKey="main.feels_like"
              name="Känns som"
              fill="#888fab"
              radius={[10, 10, 0, 0]}
              label={{ fontSize: 30, fill: "#fff", formatter: taBortDecimal }}
              animationDuration={2000}
            />
          </BarChart>
        </ResponsiveContainer>
      </>
    )}
  </>
);
}



export default WeatherGraph;