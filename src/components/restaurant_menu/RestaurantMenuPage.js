import { useEffect, useState } from "react";
import { RES_API } from "../../utils/constants";
import { useParams } from "react-router-dom";
import Shimmer from "../Shimmer";
import MenuHeader from "./MenuHeader";
import MainCategoryList from "./MainCategoryList";

const RestaurantMenuPage = () => {
  const [restaurantMenuData, setRestaurantMenuData] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const params = useParams();
  const { resId } = params;

  const fetchMenu = async () => {
    const data = await fetch(RES_API + resId);
    const json = await data.json();
    setRestaurantMenuData(json);
    console.log(json);
  };

  if (restaurantMenuData === null) {
    return <Shimmer />;
  }

  const headerData = restaurantMenuData?.data?.cards[0]?.card?.card?.info;

  const upperLimit =
    restaurantMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards?.length - 2;

  const categoryArray =
    restaurantMenuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(
      1,
      upperLimit
    );

  return (
    <div className="menu-page">
      <div className="menu-container">
        <MenuHeader headerInfo={headerData} />
        {/* <div className="veg-only-filter">
          Implement veg-only filter here later
        </div> */}
        {categoryArray.map((category, index) => (
          <MainCategoryList
            key={
              category?.card?.card?.title.split(" ").join("").slice(0, 10) +
              index
            }
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
