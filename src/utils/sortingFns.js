export function timeSorterFn(a, b) {
  const timeA =
    a.info.sla.deliveryTime === "--" ? Infinity : a.info.sla.deliveryTime;
  const timeB =
    b.info.sla.deliveryTime === "--" ? Infinity : b.info.sla.deliveryTime;
  return timeA - timeB;
}

export function ratingSorterFn(a, b) {
  const ratingA =
    a.info.avgRating === "--" ? -Infinity : parseFloat(a.info.avgRating);
  const ratingB =
    b.info.avgRating === "--" ? -Infinity : parseFloat(b.info.avgRating);
  return ratingB - ratingA;
}

export function costSorterFn1(a, b) {
  const costA =
    a.info.costForTwo === "--"
      ? Infinity
      : parseInt(a.info.costForTwo.slice(1));
  const costB =
    b.info.costForTwo.slice(1) === "--"
      ? Infinity
      : parseInt(b.info.costForTwo.slice(1));
  return costA - costB;
}

export function costSorterFn2(a, b) {
  const costA =
    a.info.costForTwo === "--"
      ? -Infinity
      : parseInt(a.info.costForTwo.slice(1));
  const costB =
    b.info.costForTwo === "--"
      ? -Infinity
      : parseInt(b.info.costForTwo.slice(1));
  return costB - costA;
}
