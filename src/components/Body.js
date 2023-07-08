import Shimmer from "./Shimmer";
import fetchRestaurantData from "../utils/fetchRestaurantData";
import LocationSearch from "./LocationSearch";
import { RestaurantCard } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  timeSorterFn,
  ratingSorterFn,
  costSorterFn1,
  costSorterFn2,
} from "../utils/sortingFns";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [currentlySelected, setCurrentlySelected] = useState("relevance");
  const [searchString, setSearchString] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);
  const [Body_API, setBody_API] = useState(
    "https://www.swiggy.com/dapi/restaurants/list/v5?page_type=DESKTOP_WEB_LISTING&lat=22.7195687&lng=75.8577258"
  );
  useEffect(() => {
    fetchData(Body_API);
  }, [Body_API]);

  const fetchData = async (apidata) => {
    const parsedData = await fetchRestaurantData(apidata);
    const num = parsedData?.data?.cards.length - 1;
    const resList = parsedData?.data?.cards[num]?.data?.data?.cards;
    setOriginalList(resList);
    setRestaurantList(resList);
  };

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      console.log("enter was pressed");
      if (searchString === "") {
        setRestaurantList(originalList);
        setShowNoResults(false);
      } else {
        const searchedList = originalList.slice().filter((restaurant) => {
          const flag = restaurant?.data?.cuisines.some(
            (element) => element.toLowerCase() === searchString.toLowerCase()
          );
          return flag;
        });

        if (searchedList.length !== 0) {
          setRestaurantList(searchedList);
          setShowNoResults(false);
        } else {
          setRestaurantList([]);
          setShowNoResults(true);
        }
      }
    }
  };

  const handleInputChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSort = (sortFn, sortType) => {
    const sortedList = originalList.slice().sort(sortFn);
    setRestaurantList(sortedList);
    setCurrentlySelected(sortType);
  };

  const handleDataFromChild = (api) => {
    setBody_API(api);
    console.log({ api });
  };

  return (
    <main className="body">
      <section className="utility-box">
        <LocationSearch sendDataToParent={handleDataFromChild} />
        <div className="filter-container">
          <div className="search-box">
            <input
              id="searchBar"
              className="search-bar"
              placeholder="Search for cuisines..."
              value={searchString}
              onChange={handleInputChange}
              autoComplete="off"
              onKeyDown={handleSearch}
            />
          </div>
          <button
            className="nowrap"
            id={currentlySelected === "relevance" ? "button-active" : ""}
            onClick={() => {
              setRestaurantList(originalList);
              setCurrentlySelected("relevance");
            }}
          >
            Relevance
          </button>
          <button
            className="nowrap"
            id={currentlySelected === "deliveryTime" ? "button-active" : ""}
            onClick={() => handleSort(timeSorterFn, "deliveryTime")}
          >
            Delivery Time
          </button>
          <button
            className="nowrap"
            id={currentlySelected === "rating" ? "button-active" : ""}
            onClick={() => handleSort(ratingSorterFn, "rating")}
          >
            Rating
          </button>
          <button
            className="nowrap"
            id={currentlySelected === "costLtoH" ? "button-active" : ""}
            onClick={() => handleSort(costSorterFn1, "costLtoH")}
          >
            Cost: Low to High
          </button>
          <button
            className="nowrap"
            id={currentlySelected === "costHtoL" ? "button-active" : ""}
            onClick={() => handleSort(costSorterFn2, "costHtoL")}
          >
            Cost: High to Low
          </button>
        </div>
      </section>
      <section className="restaurant-container">
        {showNoResults ? (
          <div>No results found</div>
        ) : restaurantList.length === 0 ? (
          <Shimmer />
        ) : (
          restaurantList.map((restaurant, index) => (
            <Link
              className="link"
              key={restaurant.data.id + index}
              to={"/restaurants/" + restaurant.data.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))
        )}
      </section>
    </main>
  );
};

export default Body;
