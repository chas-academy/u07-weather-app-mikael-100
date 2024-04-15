import React, { useState } from "react";
import ApiWeather from '../components/ApiWeather'; 



interface Inputs {
    day: string,
    unit: string,
    ord: string,
    
}

const Search = () => {
    

const [inputs, setInputs] = useState<Inputs>({day: "", unit: "", ord: ""});

  

const formData = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))

}


return (
    <>
    <form>
        <div>
            <div>
            <h1>Hitta Vädret</h1>
            <select 
            name="day" 
            id="day"
            value={inputs.day || "1"}
            // defaultValue={"1"}
            onChange={formData}
            
            >
                <option value="1" >1-Dygn</option>
                <option value="2">2-Dygn</option>
                <option value="3">3-Dygn</option>
                <option value="4">4-Dygn</option>
                <option value="5">5-Dygn</option>

            </select>
            <select
            name="unit" 
            id="unit"
            value={inputs.unit || "Celcius"}
            // defaultValue={"Celcius"}
            onChange={formData}

            >
                <option value="Celcius">Celcius</option>
                <option value="Fahrenheit">Fahrenheit</option>
            </select>
            </div>
            <div>
                <input 
                type="text" 
                placeholder="Search" 
                className="border-2 border-black rounded-full"
                name="ord"
                id="ord"
                value={inputs.ord}
                onChange={formData}
                />
            </div>
        </div>
        
    </form>
    <div>
        <ApiWeather inputs={inputs} />
       
    </div>
    </>

);


}



export default Search;










// Denna förhindrar bara att form som de annars alltid gör laddar om sidan.

// const gorAttFormInteLaddarOmSidan = (event: React.FormEvent) => {
//     event.preventDefault();
// }
