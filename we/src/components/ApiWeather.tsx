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

              <div className="bg-black rounded-lg text-white bg-opacity-60 p-10 mt-9">
                <div>
                  <div className="flex justify-center mt-5">
                    <div className="bg-black rounded-lg text-white bg-opacity-60 p-10 w-full w-full md:w-60">
                      <p className="text-4xl text-white  ">{vader.name}</p>
                      <div className="flex justify-center">
                        <p
                          className={`text-5xl  mt-2 ml-8  items-center mt-7 ${
                            vader.main.temp >= 1
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {vader.main.temp.toFixed(0)}
                        </p>
                        <p className="text-8xl mt-2 p-0 text-white">
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

                <div className="hidden sm:block   p-3 pb-6 mt-6">
                  <div className="bg-black rounded-lg text-white bg-opacity-60  mt-5">
                    <div>
                      <h1 className="text-3xl  mb-9 font-bold p-10">
                        Temperatur över dagen.
                      </h1>
                    </div>

                    <div className="sm: mr-10">
                      <WeatherGraph />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
      </div>

      {/* Prognos för veckan */}
      <div>
        <div>
          <div>
            {vader.list && (
              <>
                <div className="bg-black rounded-lg text-white bg-opacity-60  mt-5 p-4">
                  <div className="bg-black rounded-lg text-white bg-opacity-60   p-3 pb-6">
                    <h1 className="">{vader.city.name}</h1>
                    <div className="">
                      <table className="mx-auto border-collapse mt-4 shadow-lg sm:w-full">
                        <thead className="bg-black">
                          <tr className="item-center">
                            <th className="text-5xl">
                              <span className="text-5xl flex items-center justify-center">
                                {tempSymbol()}
                              </span>
                            </th>
                            <th className="text-5xl">
                              <span className="text-5xl flex items-center justify-center">
                                <WiStrongWind />
                              </span>
                            </th>
                            <th className="text-5xl">
                              <span className="text-5xl flex items-center justify-center">
                                <WiHumidity />
                              </span>
                            </th>
                            <th className="text-5xl">
                              <span className="text-5xl flex items-center justify-center">
                                <MdDateRange />
                              </span>
                            </th>
                            <th className="text-5xl">
                              <span className="text-5xl flex items-center justify-center">
                                <TiWeatherSunny />
                              </span>
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
                              <tr key={index} className="hover:bg-sky-900">
                                <td
                                  className={`py-4 text-4xl ${
                                    parseFloat(item.main.temp.toFixed(0)) >= 1
                                      ? "text-red-600"
                                      : "text-blue-600"
                                  }`}
                                >
                                  {item.main.temp.toFixed(0)}
                                </td>
                                <td className="py-">
                                  {item.wind.speed.toFixed(0)}
                                </td>
                                <td className="py-">{item.main.humidity}</td>
                                <td className="py-">
                                  {new Date(item.dt_txt)
                                    .toDateString()
                                    .slice(0, -5)}
                                </td>
                                <td className="flex flex-col items-center">
                                  <span>
                                    <img
                                      alt=""
                                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                    />
                                  </span>
                                  <span>{item.weather[0].description}</span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          {vader.list && (
            <>
              <div className="bg-black rounded-lg text-white bg-opacity-60  mt-5 p-4">
                <div className="bg-black rounded-lg text-white bg-opacity-60   p-3 pb-6">
                  <h1 className="">Prognosen För Vecka</h1>
                  <div className="">
                    <table className="border-collapse mt-4 shadow-lg sm:w-full">
                      <thead className="bg-black">
                        <tr className="item-center">
                          <th className="text-5xl">
                            <span className="text-5xl flex items-center justify-center">
                              {tempSymbol()}
                            </span>
                          </th>
                          <th className="text-5xl">
                            <span className="text-5xl flex items-center justify-center">
                              <WiStrongWind />
                            </span>
                          </th>
                          <th className="text-5xl">
                            <span className="text-5xl flex items-center justify-center">
                              <WiHumidity />
                            </span>
                          </th>
                          <th className="text-5xl">
                            <span className="text-5xl flex items-center justify-center">
                              <MdDateRange />
                            </span>
                          </th>
                          <th className="text-5xl">
                            <span className="text-5xl flex items-center justify-center">
                              <TiWeatherSunny />
                            </span>
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
                            <tr key={index} className="hover:bg-sky-900">
                              <td
                                className={`py-4 text-4xl ${
                                  parseFloat(item.main.temp.toFixed(0)) >= 1
                                    ? "text-red-600"
                                    : "text-blue-600"
                                }`}
                              >
                                {item.main.temp.toFixed(0)}
                              </td>
                              <td className="py-">
                                {item.wind.speed.toFixed(0)}
                              </td>
                              <td className="py-">{item.main.humidity}</td>
                              <td className="py-">
                                {new Date(item.dt_txt)
                                  .toDateString()
                                  .slice(0, -5)}
                              </td>
                              <td className="flex flex-col items-center">
                                <span>
                                  <img
                                    alt=""
                                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                  />
                                </span>
                                <span>{item.weather[0].description}</span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                    <div className="hidden sm:block bg-black rounded-lg text-white bg-opacity-60   p-3 pb-6 mt-6">
                      <div className=" p-5 mr-5">
                        <WeatherGraphWeek />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ApiWeather;
