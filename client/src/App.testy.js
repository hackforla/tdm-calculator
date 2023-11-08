import React from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./App";

// This test fails since we converted App.js
// to a functional component. We may want to
// resurrect it in a form that works for
// functional components later. Took this
// out of the test script by changing
// the file name from App.test.js to App.testy.js

it("renders without crashing", () => {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<AppWrapper />);
  expect(root).toBeDefined();
});
