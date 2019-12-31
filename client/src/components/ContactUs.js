import React, { useEffect } from "react";
import { useToast } from "../contexts/Toast";

const ContactUs = () => {
  const toast = useToast();

  useEffect(() => {
    // TODO: Remove toast example when ready to fill in component with content
    toast.add("check us out - this is a toast example");
  }, []);
  return <>ContactUs</>;
};

export default ContactUs;
