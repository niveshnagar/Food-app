import { useState } from "react";
import { TEMP_IMG_URL, DISH_IMG_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";
import vegLogo from "../../../assets/vegLogo.png";
import nonvegLogo from "../../../assets/nonvegLogo.png";

const MainCategoryItem = (prop) => {
  const { dish } = prop;
  
  const { name, price, defaultPrice, description, itemAttribute, imageId } =
    dish?.card?.info;
  const dishData = dish?.card?.info;

  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="dish-container">
      <div className="dish-textual-info">
        <img
          className="dish-veg-logo"
          src={itemAttribute?.vegClassifier === "VEG" ? vegLogo : nonvegLogo}
        />

        <p className="dish-name">{name}</p>
        <p className="dish-price">₹{price / 100 || defaultPrice / 100}</p>
        <p className="dish-description">{description}</p>
      </div>
      <div className="dish-image-container">
        {imageId !== undefined ? (
          <img src={DISH_IMG_URL + imageId}></img>
        ) : (
          <img src={TEMP_IMG_URL}></img>
        )}
        <button onClick={() => addFoodItem(dishData)}>ADD</button>
      </div>
    </div>
  );
};
export default MainCategoryItem;
