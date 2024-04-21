import React, { useEffect, useState } from "react";

interface Props {
  inputs: {
    day: string;
    unit: string;
    ord: string;
    lat: string;
    lng: string;
  };
}

const ApiKey: string = import.meta.env.VITE_API_KEY;

const ApiWeather: React.FC<Props> = ({ inputs }) => {
  // Gör ett interface av den datan du vill displaya från apit

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vader, setVader]: any = useState(null);

  const hamtaVader = async (inputs: {
    day: string;
    unit: string;
    ord: string;
    lat: string;
    lng: string;
  }) => {
    // console.log(inputs);
    const url: string = `http://api.openweathermap.org/data/2.5/${inputs.day}?lat=${inputs.lat}&lon=${inputs.lng}&units=${inputs.unit}&q=${inputs.ord}&appid=${ApiKey}`;

    // const url: string = `http://api.openweathermap.org/data/2.5/${inputs.day}?lat=${inputs.lat}&lon=${inputs.lng}&appid=${ApiKey}`;

    const reponse = await fetch(url);

    const result = await reponse.json();
    console.log(result);

    setVader(result);
  };

  useEffect(() => {
    console.log("Inputs in ApiWeather:", inputs);
    console.log(inputs);
    {
      hamtaVader(inputs);
    }
    //   console.log(vader)
  }, [inputs]); // Lägg till inputs som ett beroende i useEffect

  return (
    <>
      <div>
        <p>Hello</p>
        {vader && (
          <>
            {/* { <><p>Plats: {vader.city.name}</p><p>Plats: {vader.city.name}</p></>
} */}
          </>
        )}
      </div>
    </>
  );
};

export default ApiWeather;
