import { useState } from "react";
import { COLLAPSE_URL, EXPAND_URL } from "../../utils/constants";
import MainCategoryItem from "./MainCategoryItem";
import SubCategoryList from "./SubCategoryList";

const MainCategoryList = (prop) => {
  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(false);
  const { category } = prop;
  const { title, itemCards, categories } = category?.card?.card;
  const handleClick = () => {
    isCategoryCollapsed === false
      ? setIsCategoryCollapsed(true)
      : setIsCategoryCollapsed(false);
  };

  return (
    <div className="main-category">
      <div className="main-category-info">
        <div className="menu-category-title">
          {title}{" "}
          {itemCards != undefined ? <span>({itemCards.length})</span> : null}
        </div>
        {itemCards != undefined ? (
          <button
            onClick={() => {
              handleClick();
            }}
            className="category-collapse-button"
          >
            <img
              src={isCategoryCollapsed === false ? COLLAPSE_URL : EXPAND_URL}
              alt="collapse-arrow--v1"
            />
          </button>
        ) : null}
      </div>
      {itemCards != undefined && !isCategoryCollapsed
        ? itemCards.map((dishData) => (
            <MainCategoryItem key={dishData?.card?.info.id} dish={dishData} />
          ))
        : null}
      {categories != undefined
        ? categories.map((subCategoryData, index) => (
            <SubCategoryList
              key={
                subCategoryData.title.split(" ").join("").slice(0, 10) + index
              }
              subcategory={subCategoryData}
            />
          ))
        : null}
      <div className="menu-seprator"></div>
    </div>
  );
};

export default MainCategoryList;
