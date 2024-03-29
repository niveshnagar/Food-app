import Shimmer from "./Shimmer";
import fetchRestaurantData from "../utils/fetchRestaurantData";
import LocationSearch from "./LocationSearch";
import { RestaurantCard } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import RestaurantListContext from "../utils/RestaurantListContext";
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
  const { API } = useContext(RestaurantListContext);

  useEffect(() => {
    fetchData();
  }, [API]);

  const fetchData = async () => {
    const parsedData = await fetchRestaurantData(API);
    // console.log(parsedData);
    // const num = parsedData?.data?.cards.length - 1;
    const resList =
      parsedData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    // console.log(parsedData);
    setOriginalList(resList);
    setRestaurantList(resList);
  };

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      if (searchString === "") {
        setRestaurantList(originalList);
        setShowNoResults(false);
      } else {
        const searchedList = originalList?.slice().filter((restaurant) => {
          const flag = restaurant?.info?.cuisines.some(
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

  return (
    <main className="body">
      <section className="utility-box">
        <LocationSearch />
        <div className="filter-container">
          <div className="search-box">
            <input
              id="searchBar"
              data-testid="searchInput"
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
          data-testid ="sortByRating"
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
        ) : restaurantList?.length === 0 ? (
          <Shimmer />
        ) : (
          restaurantList?.map((restaurant, index) => (
            <Link
              className="link"
              key={restaurant?.info?.id + index}
              to={"/restaurants/" + restaurant?.info?.id}
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
