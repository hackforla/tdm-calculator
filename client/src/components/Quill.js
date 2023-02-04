import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quill = props => {
  const modules = {
    toolbar: [
      ["bold", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
  };

  const formats = [
    "bold",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];

  return (
    <div className="text-editor">
      <ReactQuill
        {...props}
        // theme="snow"
        modules={modules}
        formats={formats}
      ></ReactQuill>
    </div>
  );
};

export default Quill;
