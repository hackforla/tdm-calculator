import React, { useEffect } from "react";
import { useToast } from "../contexts/Toast";

const ContactUs = () => {
  const toast = useToast();

  useEffect(() => {
    toast.add("check it out");
  }, []);
  return <>ContactUs</>;
};

export default ContactUs;
