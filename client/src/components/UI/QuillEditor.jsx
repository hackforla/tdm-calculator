import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import PropTypes from "prop-types";

export const QuillEditor = React.forwardRef(
  ({ value, onChange, placeholder, className }, ref) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
      if (!containerRef.current || quillRef.current) return;

      quillRef.current = new Quill(containerRef.current, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"]
          ]
        }
      });

      quillRef.current.on("text-change", () => {
        onChange(quillRef.current.root.innerHTML);
      });

      if (value) {
        quillRef.current.root.innerHTML = value;
      }
    }, [onChange, placeholder, value]);

    useEffect(() => {
      if (
        quillRef.current &&
        value &&
        quillRef.current.root.innerHTML !== value
      ) {
        quillRef.current.root.innerHTML = value;
      }
    }, [value]);

    React.useImperativeHandle(ref, () => quillRef.current);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%"
        }}
      >
        <div ref={containerRef} className={className} />
      </div>
    );
  }
);

QuillEditor.displayName = "QuillEditor";

QuillEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string
};
