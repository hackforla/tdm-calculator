import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(
    <Router>
      <NavBar setNavbarOpen={jest.fn} account={{ email: "some-email" }} />
    </Router>
  );
  expect(root).toBeDefined();
});
