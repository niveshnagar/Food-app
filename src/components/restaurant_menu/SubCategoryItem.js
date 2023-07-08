import { useState } from "react";
import { DISH_IMG_URL, TEMP_IMG_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";
import vegLogo from "../../../assets/vegLogo.png";
import nonvegLogo from "../../../assets/nonvegLogo.png";

const SubCategoryItem = (prop) => {
  const { itemData } = prop;
  const { name, price, itemAttribute, description, imageId, defaultPrice } =
    itemData?.card?.info;
  const [isVeg, setIsVeg] = useState(itemAttribute.vegClassifier);

  const dishData = itemData?.card?.info;

  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="dish-container">
      <div className="dish-textual-info">
        <img
          className="dish-veg-logo"
          src={itemAttribute.vegClassifier === "VEG" ? vegLogo : nonvegLogo}
        />
        <p className="dish-name">{name}</p>
        <p className="dish-price">₹{price / 100 || defaultPrice / 100}</p>
        {description !== undefined ? (
          <p className="dish-description">{description}</p>
        ) : null}
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

export default SubCategoryItem;
