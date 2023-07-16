import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenuPage from "./components/restaurant_menu/RestaurantMenuPage";
import { Provider } from "react-redux";
import myStore from "./utils/myStore";
import RestaurantListContext from "./utils/RestaurantListContext";
import { resList_URL } from "./utils/constants";

// api- https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&page_type=DESKTOP_WEB_LISTING

const AppLayout = () => {
  const [resListURL, setResListURL] = useState(resList_URL);
  return (
    <Provider store={myStore} className="AppContainer">
      <Header />
      <RestaurantListContext.Provider
        value={{ API: resListURL, setResListURL }}
      >
        <Outlet />
      </RestaurantListContext.Provider>
      ,
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: [<Body />],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenuPage />,
      },
    ],
    // errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.querySelector(".container"));

root.render(<RouterProvider router={appRouter} />);
