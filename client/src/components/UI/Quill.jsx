import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quill = props => {
  const modules = {
    toolbar: [
      ["bold", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"]
    ]
  };

  const formats = [
    "bold",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link"
  ];

  return (
    <ReactQuill
      {...props}
      // theme="snow"
      modules={modules}
      formats={formats}
    />
  );
};

export default Quill;
