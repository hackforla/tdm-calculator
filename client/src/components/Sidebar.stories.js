import React from "react";
import { storiesOf } from "@storybook/react";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router } from "react-router-dom";

storiesOf("Sidebar", module).add("default", () => (
  <Router>
    <Sidebar />
  </Router>
));
