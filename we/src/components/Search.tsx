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
      <form>
        <div>
          <div>
            <h1>Hitta Vädret</h1>
            <select
              name="day"
              id="day"
              value={inputs.day}
              // defaultValue={"1"}
              onChange={formData}
            >
              <option value="weather">Just Nu</option>
              {/* <option value="2">2-Dygn</option>
                <option value="3">3-Dygn</option>
                <option value="4">4-Dygn</option> */}
              <option value="forecast">Veckans Väder</option>
            </select>
            <select
              name="unit"
              id="unit"
              value={inputs.unit}
              // defaultValue={"Celcius"}
              onChange={formData}
            >
              <option value="metric">Celcius</option>
              <option value="imperial">Fahrenheit</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border-2 border-black rounded-full"
              name="ord"
              id="ord"
              // value={inputs.ord}
              // onChange={formData}
            />
          </div>
          <button type="button" onClick={klickFunktion}>
            Sök
          </button>

          {/* inclick=(() => klickDunktion)     Kankse uppgradera till denna. denna gör så att inte funktionen triggas vid laddning */}
        </div>
      </form>
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
