import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import RestaurantMenuPage from "../restaurant_menu/RestaurantMenuPage";
import mockResMenuData from "../mocks/mockResMenuData.json";
import { Provider } from "react-redux";
import myStore from "../../utils/myStore";
import Header from "../Header";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(mockResMenuData);
    },
  });
});

it("should load restaurant menu component", async () => {
  await act(() =>
    render(
      <Provider store={myStore}>
        <BrowserRouter>
          <RestaurantMenuPage />
        </BrowserRouter>
      </Provider>
    )
  );

  const resName = screen.getByText("Gurukripa Restaurant - Sarwate");

  expect(resName).toBeInTheDocument();
});

it("should add items to cart when we clickthe add button on the restaurant menu page", async () => {
  await act(() =>
    render(
      <Provider store={myStore}>
        <BrowserRouter>
          <Header />
          <RestaurantMenuPage />
        </BrowserRouter>
      </Provider>
    )
  );

  const addBtn = screen.getAllByRole("button", { name: "ADD" });
  fireEvent.click(addBtn[0]);

  const headerCartInfo = screen.getByTestId("cartInfo");

  expect(headerCartInfo).toBeInTheDocument();
});
