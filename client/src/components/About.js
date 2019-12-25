import React, { useEffect } from "react";
import { useToast } from "../contexts/Toast";

const About = () => {
  const toast = useToast();

  useEffect(() => {
    toast.add("hello world");
  }, []);
  return <>About</>;
};

export default About;
