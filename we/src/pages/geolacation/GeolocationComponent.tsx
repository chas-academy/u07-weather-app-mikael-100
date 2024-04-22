// import { useState } from "react";

// const GeolocationComponent = () => {
//   const [userPosition, setUserPosition] = useState<{
//     lat: number | null;
//     lng: number | null;
//   } | null>(null);
//   const [status, setStatus] = useState<string | null>(null);

//   const getLocation = () => {
//     if (!navigator.geolocation) {
//       setStatus("Tyvärr har du ingen Geolacation");
//     } else {
//       setStatus("Laddar...");
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setStatus("");
//         setUserPosition({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       () => {
//         setStatus("Kan inte nå din possition");
//       }
//     );
//   };

//   return (
//     <>
//       <button onClick={() => getLocation()}>Get Location</button>
//       <h2>Cordinater</h2>
//       {status && <p>Latitude: {status}</p>}
//       {userPosition?.lat && <p>Latitude: {userPosition.lat}</p>}
//       {userPosition?.lng && <p>Latitude: {userPosition.lng}</p>}

//       {/* {lng && <p>Latitude: {lng}</p>} */}
//     </>
//   );
// };

// export default GeolocationComponent;

// // Kolla vidare på geo från 2:28
// // Du har precis installerat zustand och med det kan du dela variabler mellan
// // komonenter hur du vill. DU vill nu skicka geo locaktion till api så det kan tas in i url för att söka plats.
// // Det du kanske kan göra är att ha en knapp på första sidan som är hämta väder för mi position få dit dessa värden och genom där skicka dem till weather api för att få fram possitionen.
// // Ha väder som e state för att ändra från gelacation växla väder
