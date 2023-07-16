import { createContext } from "react";
import { resList_URL } from "./constants";

const RestaurantListContext = createContext({
  resList_URL,
});

export default RestaurantListContext;
