import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import TdmAuthProvider from "../Layout/TdmAuthProvider";

it("renders without crashing", () => {
  render(
    <Router>
      <TdmAuthProvider>
        <NavBar setNavbarOpen={jest.fn} account={{ email: "some-email" }} />
      </TdmAuthProvider>
    </Router>
  );
  expect(screen.getByText("About")).toBeInTheDocument();
});
