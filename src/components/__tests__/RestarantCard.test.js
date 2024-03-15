import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RestaurantCard } from "../RestaurantCard";
import mockData from "../mocks/mockData.json";

it("should render RestaurantCard component with props data", () => {
  render(<RestaurantCard resData={mockData} />);

  const name = screen.getByText("UBQ BY Barbeque Nation");

  expect(name).toBeInTheDocument();
});
