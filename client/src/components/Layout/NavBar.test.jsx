import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import TdmAuthProvider from "../Layout/TdmAuthProvider";

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'querySelector');
});

it("renders without crashing", () => {
  let mockBody =document.createElement('body',);
  spy.mockReturnValue(mockBody);

  render(
    <Router>
      <TdmAuthProvider>
        <NavBar setNavbarOpen={jest.fn} account={{ email: "some-email" }} />
      </TdmAuthProvider>
    </Router>
  );
  expect(screen.getByText("About")).toBeInTheDocument();
});
