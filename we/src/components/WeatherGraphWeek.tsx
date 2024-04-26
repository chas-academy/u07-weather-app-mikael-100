import React from "react";
import { useWeatherData } from "../store/useWeatherData";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";





const WeatherGraphWeek: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anvandVaderData = useWeatherData((state: any) => state.vader);



//   Denna kod

  let tidigareDatum: string | null = null;

  const visaDatumKortEnGang = (dt_text: string) => {
    const datum = new Date(dt_text);
    const dagensSiffra = datum.getDate();
    const dagensNamn = datum.toLocaleDateString("sv-SE", { weekday: "short" });
    const kortDatum = `${dagensNamn} ${dagensSiffra}`;

    if (kortDatum !== tidigareDatum) {
        tidigareDatum = kortDatum;
        return kortDatum;
    }
    

    return " ";
  };

  return (
    <>
      {anvandVaderData && (
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={anvandVaderData.list} width={500} height={300}>
            <XAxis
              dataKey="dt_txt"
              tickFormatter={visaDatumKortEnGang}
              tickLine={{ strokeWidth: 0 }}
            />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="main.temp_max"
              stroke="#FE5555"
              name="Max"
              strokeWidth={3}
              animationDuration={10000}
              dot={false}
              strokeLinecap="round"
            />

            <Line
              dataKey="main.temp_min"
              stroke="#177FD9"
              name="Min"
              strokeWidth={3}
              animationDuration={10000}
              dot={false}
              strokeLinecap="round"
            />
            <Line
              dataKey="main.feels_like"
              stroke="#0BCE06"
              name="Känns som"
              strokeWidth={3}
              animationDuration={10000}
              dot={false}
              strokeLinecap="round"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default WeatherGraphWeek;