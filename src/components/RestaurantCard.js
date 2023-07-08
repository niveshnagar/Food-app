import { CDN_URL } from "../utils/constants";

// body fn component;
export const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    deliveryTime,
    costForTwoString,
  } = resData?.data;

  return (
    <div className="restaurant-card">
      {cloudinaryImageId ? (
        <img src={`${CDN_URL}${cloudinaryImageId}`} />
      ) : (
        <div className="shimmer-img"></div>
      )}
      <p className="restaurant-name"> {name}</p>
      <p className="restaurant-cuisines">
        {cuisines.join(", ").slice(0, 100)}
      </p>
      <div className="restaurant-stats">
        <div className="restaurant-stat-1"> &#9733; {avgRating}</div>
        <div>•</div>
        <div> {deliveryTime} MINS</div>
        <div>•</div>
        <div> {costForTwoString}</div>
      </div>
    </div>
  );
};
