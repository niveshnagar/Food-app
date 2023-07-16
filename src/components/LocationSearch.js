import { useState, useContext } from "react";
import { API_URL, PLACE_ID_URL } from "../utils/constants";
import RestaurantListContext from "../utils/RestaurantListContext";

const LocationSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [isDropdownActive, setIsdropdownActive] = useState(false);
  const { setResListURL } = useContext(RestaurantListContext);

  const handleInputChange = (event) => {
    setSearchString(event.target.value);
  };

  const fetchLocationData = async (event) => {
    if (event.keyCode === 13) {
      if (searchString.trim() !== "") {
        setIsdropdownActive(true);
      }
      if (searchString === "") {
        setIsdropdownActive(false);
      } else {
        const streamData = await fetch(
          `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchString.replace(
            " ",
            "%20"
          )}`
        );
        const jsonData = await streamData.json();
        const autoCompleteList = jsonData?.data || [];
        /* here autoCompleteList will be an array of 5 places*/
        setDropdownData(autoCompleteList);
      }
    }
  };

  const fetchCoordinates = async (placeId) => {
    const string = await fetch(PLACE_ID_URL + placeId);
    const json = await string.json();
    const { lat, lng } = json?.data[0]?.geometry?.location;
    const strAPI = API_URL + `lat=${lat}&lng=${lng}`;
    // update API to strAPI somehow;
    setResListURL(strAPI);
  };

  return (
    <div className="location-search">
      <div className="location-Search-input">
        <input
          id="citySearchBar"
          className="city-search-bar"
          placeholder="Choose your location..."
          value={searchString}
          onChange={handleInputChange}
          autoComplete="off"
          onKeyDown={fetchLocationData}
        />
      </div>

      {dropdownData !== [] && isDropdownActive ? (
        <ul className={"location-list"}>
          {dropdownData?.map((location, index) => (
            <li
              key={"dropdown" + index}
              onClick={() => {
                setIsdropdownActive(false);
                fetchCoordinates(location.place_id);
              }}
              className="location-detail"
            >
              {location.description}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default LocationSearch;
