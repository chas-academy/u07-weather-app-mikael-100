import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Search from "./components/Search.tsx";
import {
  Link,
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
        <div>
          
          <Link to={"app2"}>Om Oss</Link>
        </div>
        <Search></Search>
        {/* <GeolocationComponent></GeolocationComponent> */}
        <Outlet></Outlet>
      </>
    ),

    children: [
      { path: "app", element: <h1>This is children</h1> },
      { path: "app2", element: <h1>This is children2</h1> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
