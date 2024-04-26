import React, { useEffect, useState } from "react";
import ApiWeather from "../components/ApiWeather";


interface Inputs {
  day: string;
  unit: string;
  ord: string;
  lng: string;
  lat: string;
}

const Search = () => {
  const [inputs, setInputs] = useState<Inputs>({
    day: "weather",
    unit: "metric",
    ord: "",
    lng: "",
    lat: "",
  });

  const formData = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const klickFunktion = () => {
    const inputElement = document.getElementById("ord") as HTMLInputElement;
    const ordValue = inputElement.value;
    console.log(ordValue);
    setInputs((prevInputs) => ({ ...prevInputs, ord: ordValue }));
  };
  //

  // Geoloaction
  useEffect(() => {
    getLocation(); // Hämta användarens position när komponenten monteras
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Tyvärr har du ingen Geolocation");
    } else {
      console.log("Laddar...");
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Position hämtad");
        setInputs((prevInputs) => ({
          ...prevInputs,
          lat: String(position.coords.latitude),
          lng: String(position.coords.longitude),
        }));
      },
      () => {
        console.log("Kan inte nå din position");
      }
    );
  };

  return (
    <>
      <div>
        <h1 className="text-5xl mb-7">HITTA VÄDRET</h1>
        <form className="flex justify-center items-center">
          <div className="flex items-center">
            <div className="flex justify-center sm:flex-col items-center">
              <div className="bg-black bg-opacity-60 p-9 rounded-lg">
                <div className="flex">
                  <div className="mx-2">
                    <select
                      name="day"
                      id="day"
                      value={inputs.day}
                      onChange={formData}
                      className="border hover:border-gray-900 px-4 py-2 pr-8 rounded"
                    >
                      <option value="weather">Just Nu</option>
                      <option value="forecast">Veckans Väder</option>
                    </select>
                  </div>
                  <div className="mx-2">
                    <select
                      name="unit"
                      id="unit"
                      value={inputs.unit}
                      onChange={formData}
                      className="border hover:border-gray-900 px-4 py-2 pr-8 rounded"
                    >
                      <option value="metric">Celcius</option>
                      <option value="imperial">Fahrenheit</option>
                    </select>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="  Search"
                    className="border-2 border-black rounded mt-3 py-2"
                    name="ord"
                    id="ord"
                    // value={inputs.ord}
                    // onChange={formData}
                  />
                </div>
                <button
                  type="button"
                  onClick={klickFunktion}
                  className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded mt-3 "
                >
                  Sök
                </button>

                {/* inclick=(() => klickDunktion)     Kankse uppgradera till denna. denna gör så att inte funktionen triggas vid laddning */}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>
        <ApiWeather inputs={inputs} />
      </div>
    </>
  );
};

export default Search;

// Denna förhindrar bara att form som de annars alltid gör laddar om sidan.

// const gorAttFormInteLaddarOmSidan = (event: React.FormEvent) => {
//     event.preventDefault();
// }
