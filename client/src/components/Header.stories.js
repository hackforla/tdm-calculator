import React from "react";
import { storiesOf } from "@storybook/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

storiesOf("Header", module).add("default", () => (
  <Router>
    <Header />
  </Router>
));
