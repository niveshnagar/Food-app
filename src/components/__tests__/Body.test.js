import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import Body from "../Body";
import mockData from "../mocks/mockResList.json";

// Mock the fetch function

describe("Body Component Test cases", () => {
  // beforeall takes a callback function
  // beforeAll(() => {
  //   console.log("Before All");
  // });
  
  // // before each runs before each test case
  // beforeEach(() => {
  //   console.log("this is will run before each test case");
  // });

  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => {
        return Promise.resolve(mockData);
      },
    });
  });

  it("should render the body component with search", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    );

    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(20);

    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: { value: "barbecue" } });
    fireEvent.keyDown(searchInput, { keyCode: 13 });

    const cardsAfterSearch = await screen.getAllByTestId("resCard");
    expect(cardsAfterSearch.length).toBe(2);
  });

  it("should only show the cards with required cuisine", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    );

    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(20);

    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: { value: "barbecue" } });
    fireEvent.keyDown(searchInput, { keyCode: 13 });

    const cardsAfterSearch = await screen.getAllByTestId("resCard");
    expect(cardsAfterSearch.length).toBe(2);
  });

  it("should sort the cards on screen by rating when rating sorting is clicked", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    );
    // Helper function to extract the restaurant names from the cards
    const extractRestaurantRatings = (cardElement) => {
      // Find the element containing the restaurant name within the card
      const ratingElement = cardElement.querySelector(".restaurant-stat-1");

      // console.log("rating elements",parseFloat(ratingElement.textContent.trim().slice(1)));
      return parseFloat(ratingElement.textContent.trim().slice(1)); // Extract and trim the text
    };

    const cardsBeforeSorting = screen.getAllByTestId("resCard");

    // simulate user clicking sortby rating buttonon our app by firing the event
    const sortByRatingButton = screen.getByTestId("sortByRating");
    fireEvent.click(sortByRatingButton);

    const cardsAfterSorting = screen.getAllByTestId("resCard");

    // make two arrays by extracing data from the cards array previously made
    const resRatingBeforeSorting = cardsBeforeSorting.map(
      extractRestaurantRatings
    );

    const resRatingAfterSorting = cardsAfterSorting.map(
      extractRestaurantRatings
    );

    // print the arrays of floats
    // console.log("array before sorting: ", resRatingBeforeSorting);
    // console.log("array after sorting: ", resRatingAfterSorting);

    const sortedArray = resRatingBeforeSorting.slice().sort((a, b) => b - a);
    console.log("sorted array: ", sortedArray);

    // compare the two arrays
    let isWorkingFine = true;
    sortedArray.map((num, index) => {
      if (num != resRatingAfterSorting[index]) {
        isWorkingFine = false;
      }
    });

    expect(isWorkingFine).toBe(true);
  });
});
