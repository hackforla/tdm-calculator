import React, { useEffect } from "react";
import { useToast } from "../contexts/Toast";

const About = () => {
  const toast = useToast();

  useEffect(() => {
    // TODO: Remove toast example when ready to fill in component with content
    toast.add("hello world - this is a toast example");
  }, []);
  return <>About</>;
};

export default About;
