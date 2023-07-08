export function timeSorterFn(a, b) {
  const timeA = a.data.deliveryTime === "--" ? Infinity : a.data.deliveryTime;
  const timeB = a.data.deliveryTime === "--" ? Infinity : b.data.deliveryTime;
  return timeA - timeB;
}

export function ratingSorterFn(a, b) {
  const ratingA =
    a.data.avgRating === "--" ? -Infinity : parseFloat(a.data.avgRating);
  const ratingB =
    b.data.avgRating === "--" ? -Infinity : parseFloat(b.data.avgRating);
  return ratingB - ratingA;
}

export function costSorterFn1(a, b) {
  const costA = a.data.costForTwo === "--" ? Infinity : a.data.costForTwo;
  const costB = a.data.costForTwo === "--" ? Infinity : b.data.costForTwo;
  return costA - costB;
}

export function costSorterFn2(a, b) {
  const costA = a.data.costForTwo === "--" ? -Infinity : a.data.costForTwo;
  const costB = a.data.costForTwo === "--" ? -Infinity : b.data.costForTwo;
  return costB - costA;
}
