import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Search from "./components/Search.tsx";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
// import GeolocationComponent from "./pages/geolacation/GeolocationComponent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      
      
        <App></App>
        
      
        <Outlet></Outlet>
      </>
    ),

    children: [
      // { path: "app2", element: <Test/> },
      { path: "/", element: <Search></Search> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);


