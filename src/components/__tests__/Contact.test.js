import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Contact from "../Contact";

describe("Test cases for the contact page", () => {
  // We can also use "it" instead of "test" as the name of the function

  it("Should load contact us component", () => {
    render(<Contact />);

    const button = screen.getByText("Submit");
    // console.log("test", button);

    // Assertion
    expect(button).toBeInTheDocument();
  });

  it("Should load contact us component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");

    // Assertion
    expect(heading).toBeInTheDocument();
  });

  it("Should load button inside contact component", () => {
    render(<Contact />);

    // const button = screen.getByRole("button");
    const button = screen.getByRole("button");

    // Assertion
    expect(button).toBeInTheDocument();
  });

  it("Should load 2 input boxes inside contact component", () => {
    render(<Contact />);

    const inputBoxes = screen.getAllByRole("textbox");

    // Assertion
    expect(inputBoxes.length).toBe(2);
  });
});
