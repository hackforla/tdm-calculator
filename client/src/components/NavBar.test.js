import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <NavBar setNavbarOpen={jest.fn} account={{ email: "some-email" }} />
    </Router>,
    div
  );
  expect(div).toBeDefined();
});
