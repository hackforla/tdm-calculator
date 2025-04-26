import React, { useRef, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ROUTES } from "../../../src/routes.jsx";
import "../../../src/styles/AdminQuill.scss";

const Quill = props => {
  const quillRef = useRef(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const savedRange = useRef(null);

  const insertLink = url => {
    const editor = quillRef.current?.getEditor();

    if (editor && url) {
      if (savedRange.current) {
        editor.setSelection(savedRange.current);
      }
      editor.format("link", url);
    }

    setShowLinkDialog(false);
    setLinkValue("");
    savedRange.current = null;
  };

  /* eslint-disable react/prop-types */
  const modules = useMemo(
    () => ({
      ...props.modules,
      toolbar: {
        container: [
          ["bold", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["link"]
        ],
        handlers: {
          link: () => {
            const editor = quillRef.current?.getEditor();
            const range = editor?.getSelection();

            if (range && range.length > 0) {
              savedRange.current = range;
              setShowLinkDialog(true);
            }
          }
        }
      }
    }),
    [props.modules]
  );

  return (
    <div className="editorWrapper">
      <ReactQuill
        {...props}
        ref={quillRef}
        modules={modules}
        theme="snow"
        style={{ width: "100%" }}
      />

      {showLinkDialog && (
        <div className="linkDialog">
          <input
            type="text"
            value={linkValue}
            onChange={e => setLinkValue(e.target.value)}
            placeholder="Provide URL"
            className="linkInput"
          />
          <select
            value={linkValue}
            onChange={e => setLinkValue(e.target.value)}
            className="linkSelect"
          >
            <option value="">Or Select Internal Page</option>
            {ROUTES.map(({ label, path }) => (
              <option key={path} value={path}>
                {label}
              </option>
            ))}
          </select>
          <div className="dialogActions">
            <button onClick={() => insertLink(linkValue)}>Insert</button>
            <button
              onClick={() => {
                setShowLinkDialog(false);
                savedRange.current = null;
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quill;
/* eslint-enable react/prop-types */