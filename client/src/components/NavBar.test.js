import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

it("renders without crashing", () => {
  // const container = document.getElementById("root");
  // const root = createRoot(container);
  // root.render(
  render(
    <Router>
      <NavBar setNavbarOpen={jest.fn} account={{ email: "some-email" }} />
    </Router>
  );
  expect(screen.getByText("About")).toBeInTheDocument();
});
