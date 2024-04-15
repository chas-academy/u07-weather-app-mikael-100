import React, { useEffect, useState } from "react";


interface Props {
    inputs: {
        day: string;
        unit: string;
        ord: string;
        
    };
}

const ApiKey: string = '587d7a5441854067880152053241504';

// const Url: string = 'http://api.weatherapi.com/v1/forecast.json?key=587d7a5441854067880152053241504&q=sweden&days=10&aqi=no&alerts=no';

const ApiWeather: React.FC<Props>  = ({inputs}) => {

const [vader, setVader] = useState(inputs);

const hamtaVader = async () => {
    const url: string = `http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${inputs.ord}&days=${inputs.day}&aqi=no&alerts=no`;
    const reponse = await fetch(url);
    const result = await reponse.json();
    setVader(result);
    console.log(result);
}
useEffect(() => {

},[vader])

// Problem med att den hämtar konstant

    return (
        <>
     
        </>




    );


}







export default ApiWeather;