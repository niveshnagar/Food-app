const fetchRestaurantData = async (api) => {
  const data = await fetch(api);
  const parsedData = await data.json();
  return parsedData;
};

export default fetchRestaurantData;
