import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Modal />
    </Router>,
    div
  );
  expect(div).toBeDefined();
});
