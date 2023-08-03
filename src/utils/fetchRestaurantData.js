const fetchRestaurantData = async (api) => {
  const data = await fetch(api);
  const json = await data.json();
  return json;
};

export default fetchRestaurantData;
