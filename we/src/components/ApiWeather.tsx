import React, { useEffect, useState } from "react";
import { useWeatherData } from "../store/useWeatherData";
import WeatherGraph from "./WeatherGraph";
import WeatherGraphWeek from "./WeatherGraphWeek";
import { WiCelsius, WiFahrenheit, WiHumidity, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";
import { TiWeatherSunny } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
// const storeDataWeather = useWeatherData(state: => state.inputs)



interface Props {
  inputs: {
    day: string;
    unit: string;
    ord: string;
    lat: string;
    lng: string;
  };
}

interface weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface vaderLista {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  dt_txt: string;
  weather: weather[];
}

// Här importeras nyckeln från .env-filen

const ApiKey: string = import.meta.env.VITE_API_KEY;

const ApiWeather: React.FC<Props> = ({ inputs }) => {

  // I denna anropar vi storen


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateVader = useWeatherData((state: any) => state.updateVader)

// Denna kallar på store och kollar vad som finns i den.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const vaderStore = useWeatherData((state: any) => state.vader)
// console.log(vaderStore);



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vader, setVader]: any = useState(null);

  

const hamtaVader = async (inputs: {



  day: string;
  unit: string;
  ord: string;
  lat: string;
  lng: string;
}) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/${inputs.day}?lat=${inputs.lat}&lon=${inputs.lng}&units=${inputs.unit}&q=${inputs.ord}&appid=${ApiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Något blev fel med sökningen!");
    }

    const result = await response.json();
    console.log(result);

    setVader(result);
    
  } catch (error) {
    console.error("Kunde inte hämta väder data:", error);
  }
};

// Denna useEffekt uppdaterar funktionen som skickar datan till store

useEffect(() => {
  updateVader(vader)
},[vader, updateVader])

  useEffect(() => {
    console.log("Inputs in ApiWeather:", inputs);
    console.log(inputs);
    {
      hamtaVader(inputs);
    }
    tempSymbol();

  }, [inputs]); // Lägg till inputs som ett beroende i useEffect

  console.log(typeof vader)


  const tempSymbol = () => {
    if (inputs.unit === 'metric') {
      return <WiCelsius />;
    } else if (inputs.unit === 'imperial') {
      return <WiFahrenheit />;
    } else {
      return null;
    }

  }

  // Denna if kontrollerar om vader är null eller om vader.main är lika med null om detta är sant returneras loading...

  if (!vader || vader.main === null) {
    return <p>Loading...</p>;
  }


  

  return (
    <>
      {/* Prognos för nuvarande position */}
      <div>
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
                {/* Temperatur */}

                <div>
                  <div className="flex justify-center mt-5">
                    <div className="bg-black rounded-lg text-white bg-opacity-60 p-10 w-full w-full md:w-60">
                      <p className="text-4xl text-white  ">{vader.name}</p>
                      <div className="flex justify-center">
                        <p
                          className={`p-6 text-5xl p-0 mt-7 ml-8 ${
                            vader.main.temp >= 1
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {vader.main.temp.toFixed(0)}
                        </p>
                        <p className="text-8xl  p-0 mt-2 p-0 text-white">
                          {tempSymbol()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex flex-wrap flex-col sm:flex-row justify-center sm:space-x-4 w-full">
                    {/* Vindstryrka */}
                    <div className="bg-black rounded-lg text-white bg-opacity-60 p-4 flex flex-col items-center mt-4 w-full md:w-60">
                      <p className="text-2xl">{vader.wind.speed}</p>
                      <WiStrongWind className="text-5xl" />
                    </div>
                    {/* Luftfuktighet */}
                    <div className="bg-black rounded-lg text-white bg-opacity-60 p-4 flex flex-col items-center mt-4 w-full md:w-60">
                      <p className="text-2xl">{vader.main.humidity}</p>
                      <WiHumidity className="text-5xl" />
                    </div>
                    {/* Väderbeskrivning */}
                    <div className="bg-black rounded-lg text-white bg-opacity-60 p-4 flex flex-col items-center mt-4 w-full md:w-60">
                      <p className="text-2xl">{vader.weather[0].description}</p>
                      <img
                        src={`http://openweathermap.org/img/wn/${vader.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className="w-24 h-24"
                      />
                    </div>
                    {/* Soluppgång */}
                    <div className="bg-black rounded-lg text-white bg-opacity-60 p-4 flex flex-col items-center mt-4 w-full md:w-60">
                      <p className="text-2xl">
                        {new Date(vader.sys.sunrise * 1000)
                          .toLocaleTimeString()
                          .slice(0, -3)}
                      </p>
                      <WiSunrise className="text-5xl" />
                    </div>
                    {/* Solnedgång */}
                    <div className="bg-black rounded-lg text-white bg-opacity-60 p-4 flex flex-col items-center mt-4 w-full md:w-60">
                      <p className="text-2xl">
                        {new Date(vader.sys.sunset * 1000)
                          .toLocaleTimeString()
                          .slice(0, -3)}
                      </p>
                      <WiSunset className="text-5xl" />
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="text-5xl mt-8 mb-6">Temperatur över dagen.</h1>
                </div>

                <div className="sm: mr-10">
                  <WeatherGraph />
                </div>
              </>
            )}
        </div>

        {/* Prognos för veckan */}

        <div>
          {vader.list && (
            <>
              <h1 className="">{vader.city.name}</h1>
              <div className="">
                <table className="mx-auto border-collapse mt-4 shadow-lg sm:w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="">
                      <th>
                        <div className="text-5xl flex items-center justify-center">
                          {tempSymbol()}
                        </div>
                      </th>
                      <th>
                        <div className="text-5xl flex items-center justify-center">
                          <WiStrongWind />
                        </div>
                      </th>
                      <th>
                        <div className="text-5xl flex items-center justify-center">
                          <WiHumidity />
                        </div>
                      </th>
                      <th>
                        <div className="text-5xl flex items-center justify-center">
                          <MdDateRange />
                        </div>
                      </th>
                      <th>
                        <div className="text-5xl flex items-center justify-center">
                          <TiWeatherSunny />
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* {vader.list.filter(day => new Date(day.dt_txt).getDate() !== new Date(Date.now()).getDate() && new Date(day.dt_txt).getHours() === 12 ).map((item: vaderLista, index: number) => ( */}

                    {vader.list
                      .filter(
                        (day: vaderLista) =>
                          new Date(day.dt_txt).getDate() ===
                          new Date(Date.now()).getDate()
                      )
                      .map((item: vaderLista, index: number) => (
                        <tr
                          key={index}
                          className="shadow border-10 border-black bg-white-500 hover:bg-blue-200 mb-5"
                        >
                          <td
                            className={`py-4 text-4xl ${
                              parseFloat(item.main.temp.toFixed(0)) >= 1
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                          >
                            {item.main.temp.toFixed(0)}
                          </td>

                          <td className="py-">{item.wind.speed.toFixed(0)}</td>
                          <td className="py-">{item.main.humidity}</td>
                          <td className="py-">
                            {new Date(item.dt_txt).toDateString().slice(0, -5)}
                          </td>
                          <div className="flex items-center justify-center">
                            <td className="py-">
                              <div className="flex items-center justify-center">
                                <img
                                  alt=""
                                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                />
                              </div>
                              <div className="flex items-center justify-center">
                                {item.weather[0].description}
                              </div>
                            </td>
                          </div>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div>
          {vader.list && (
            <>
              <h1 className="">Veckans Väder</h1>
              <table className="mx-auto border-collapse mt-4 shadow-lg">
                <thead className="sticky top-0 bg-white">
                  <tr className="">
                    <th>
                      <div className="text-5xl flex items-center justify-center">
                        {tempSymbol()}
                      </div>
                    </th>
                    <th>
                      <div className="text-5xl flex items-center justify-center">
                        <WiStrongWind />
                      </div>
                    </th>
                    <th>
                      <div className="text-5xl flex items-center justify-center">
                        <WiHumidity />
                      </div>
                    </th>
                    <th>
                      <div className="text-5xl flex items-center justify-center">
                        <MdDateRange />
                      </div>
                    </th>
                    <th>
                      <div className="text-5xl flex items-center justify-center">
                        <TiWeatherSunny />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {vader.list
                    .filter(
                      (day: vaderLista) =>
                        new Date(day.dt_txt).getDate() !==
                          new Date(Date.now()).getDate() &&
                        new Date(day.dt_txt).getHours() === 12
                    )
                    .map((item: vaderLista, index: number) => (
                      <tr
                        key={index}
                        className="shadow border-10 border-black bg-white-500 hover:bg-blue-200 mb-5"
                      >
                        <td
                          className={`py-4 text-4xl ${
                            parseFloat(item.main.temp.toFixed(0)) >= 1
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {item.main.temp.toFixed(0)}
                        </td>

                        <td className="py-">{item.wind.speed.toFixed(0)}</td>
                        <td className="py-">{item.main.humidity}</td>
                        {/* <td className="py-4">{item.dt_txt.slice(0, -6)}</td> */}
                        <td className="py-">
                          {new Date(item.dt_txt).toDateString().slice(0, -5)}
                        </td>
                        <div className="flex items-center justify-center">
                          <td className="py-">
                            <div className="flex items-center justify-center">
                              <img
                                alt=""
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              {item.weather[0].description}
                            </div>
                          </td>
                        </div>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
          <div>
            <WeatherGraphWeek />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiWeather;
