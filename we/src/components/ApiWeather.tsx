import React, { useEffect, useState } from "react";


interface Props {
    inputs: {
        day: string;
        unit: string;
        ord: string;
        
    };
}

// interface WeatherData {
//     name: string,
//     region: string,
// }

const ApiKey: string = import.meta.env.VITE_API_KEY;



const ApiWeather: React.FC<Props>  = ({inputs}) => {


    // Gör ett interface av den datan du vill displaya från apit

    // api.openweathermap.org/data/2.5/forecast?lat=11&lon=11&units=metric&units=imperial&q=Skövde&appid=466407c762de460c649fe1211434f047

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [vader , setVader]: any = useState(null);

const hamtaVader = async (inputs: {day: string, unit: string, ord: string}) => {
    // console.log(inputs);
    const url: string = `http://api.openweathermap.org/data/2.5/${inputs.day}?lat=11&lon=11&units=${inputs.unit}&q=${inputs.ord}&appid=${ApiKey}`;
    
    const reponse = await fetch(url);

    const result = await reponse.json();
     console.log(result);
   
    setVader(result);
} 

// useEffect(() => {
//     console.log(inputs);
//     hamtaVader(inputs);
// }
// //   console.log(vader) 
//     , []); // Lägg till inputs som ett beroende i useEffect



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
                       {/* { <><p>Plats: {vader.city.name}</p><p>Plats: {vader.city.name}</p></>
} */}
                    </>
                }
            </div>
     
        </>




    );


}







export default ApiWeather;


// const Url: string = 'http://api.weatherapi.com/v1/forecast.json?key=587d7a5441854067880152053241504&q=sweden&days=10&aqi=no&alerts=no';
