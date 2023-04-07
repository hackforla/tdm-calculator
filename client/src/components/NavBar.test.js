import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.createRoot(div).render(
    <Router>
      <NavBar setNavbarOpen={jest.fn} account={{ email: "some-email" }} />
    </Router>
  );
  expect(div).toBeDefined();
});
