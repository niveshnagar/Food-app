import { useState } from "react";
import { COLLAPSE_URL, EXPAND_URL } from "../../utils/constants";
import SubCategoryItem from "./SubCategoryItem";

const SubCategoryList = (prop) => {
  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(true);
  const { subcategory } = prop;
  const handleClick = () => {
    isCategoryCollapsed === false
      ? setIsCategoryCollapsed(true)
      : setIsCategoryCollapsed(false);
  };

  return (
    <div className="sub-category-container">
      <div className="sub-category-header">
        <div className="sub-category-title">
          {subcategory.title} ({subcategory.itemCards.length})
        </div>
        <button
          onClick={() => {
            handleClick();
          }}
          className="category-collapse-button"
        >
          <img
            src={isCategoryCollapsed === false ? COLLAPSE_URL : EXPAND_URL}
            alt="collapse-arrow--v1"
          />{" "}
        </button>
      </div>
      {!isCategoryCollapsed
        ? subcategory.itemCards.map((subCategoryItemData) => (
            <SubCategoryItem itemData={subCategoryItemData} />
          ))
        : null}
    </div>
  );
};

export default SubCategoryList;
