import React, { useEffect, useState } from "react";


interface Props {
    inputs: {
        day: string;
        unit: string;
        ord: string;
        
    };
}

interface WeatherData {
    name: string,
    region: string,
}

const ApiKey: string = '587d7a5441854067880152053241504';



const ApiWeather: React.FC<Props>  = ({inputs}) => {


    // Gör ett interface av den datan du vill displaya från apit

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [vader , setVader] = useState<WeatherData | null>(null);

const hamtaVader = async (inputs: {day: string, unit: string, ord: string}) => {
    console.log(inputs);
    const url: string = `http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${inputs.ord}&days=${inputs.day}&aqi=no&alerts=no`;
    const reponse = await fetch(url);
    const result = await reponse.json();
    const WeaterData: WeatherData = {
        name: result.location.name,
        region: result.location.region,
    }
    // setVader(result);
    console.log(result);
    setVader(WeaterData);
}

useEffect(() => {
    console.log(inputs);
if (inputs && inputs.day && inputs.ord) {
  hamtaVader(inputs);
}
//   console.log(vader) 
    }, [inputs]); // Lägg till inputs som ett beroende i useEffect

    return (
        <>
        <div>
            <p>Hello</p>
                {vader && 
                    <>
                        <p>Plats: {vader.name}</p>
                        <p>Plats: {vader.region}</p>
                        {/* <p>Temperatur: {vader.current.condition.text} °C</p> */}
                        {/* Lägg till fler data här */}
                    </>
                }
            </div>
     
        </>




    );


}







export default ApiWeather;


// const Url: string = 'http://api.weatherapi.com/v1/forecast.json?key=587d7a5441854067880152053241504&q=sweden&days=10&aqi=no&alerts=no';
