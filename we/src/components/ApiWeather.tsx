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

interface vaderLista {
  main: {
    temp: number;
  };
  wind: {
    speed: number;
  };
  dt_txt: string;
  weather: weather[];
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

  // Denna if kontrollerar om vader är null eller om vader.main är lika med null om detta är sant returneras loading...

  if (!vader || vader.main === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <>
          <>
            <div>
              {vader.main &&
                vader.sys &&
                vader.weather &&
                vader.wind &&
                vader.weather[0] &&
                vader.main.temp &&
                vader.main.humidity &&
                vader.name && (
                  <>
                    <p>Plats: {vader.name}</p>

                    <img
                      src={`http://openweathermap.org/img/wn/${vader.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />

                    <p>Temp: {vader.main.temp}</p>
                    <p>Vinstryrka: {vader.wind.speed}</p>
                    <p>Luftfuktighet: {vader.main.humidity}</p>
                    <p>
                      Soluppgång:{" "}
                      {new Date(vader.sys.sunrise * 1000)
                        .toLocaleTimeString()
                        .slice(0, -3)}
                    </p>
                    <p>
                      Solnedgång:{" "}
                      {new Date(vader.sys.sunset * 1000)
                        .toLocaleTimeString()
                        .slice(0, -3)}
                    </p>
                  </>
                )}
            </div>
            <div>
              {vader.list && (
                <>
                  <h1>{vader.city.name}</h1>
                  {vader.list.map((item: vaderLista, index: number) => (
                    <div className="flex mx-auto justify-center shadow border-10 border-black mt-4 bg-white-500 hover:bg-blue-200">
                      <div>
                        <div key={index} className="inline-block flex">
                          <p>Temperatur: {item.main.temp}</p>
                          <br />
                          <p>Vindstyrka: {item.wind.speed}</p>
                          <p>Datum: {item.dt_txt.slice(0, -6)}</p>
                          <img
                            alt=""
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        </>
      </div>
    </>
  );
};

export default ApiWeather;
