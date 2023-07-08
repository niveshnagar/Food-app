import { Dial_URL, Rupees_URL } from "../../utils/constants";

const MenuHeader = (prop) => {
  const { headerInfo } = prop;
  const {
    name,
    cuisines,
    areaName,
    sla,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
  } = headerInfo;

  return (
    <div className="restaurant-header">
      <div className="restaurant-overview">
        <div className="res-overview-1">
          <p className="res-name">{name}</p>
          <p className="res-small-gray">{cuisines.join(", ")}</p>
          <p className="res-small-gray">
            {areaName}, {sla.lastMileTravelString}
          </p>
        </div>
        <div className="res-rating">
          <p>&#9733; {avgRatingString}</p>
          <p>{totalRatingsString}</p>
        </div>
      </div>
      <div className="res-stats">
        <img src={Dial_URL} />
        <span>{sla.deliveryTime} MINS</span>
        <img src={Rupees_URL} />
        <span>{costForTwoMessage}</span>
      </div>
    </div>
  );
};

export default MenuHeader;
