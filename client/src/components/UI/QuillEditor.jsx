import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import UniversalSelect from "../UI/UniversalSelect.jsx";
import { ROUTES } from "../../../src/routes.jsx";

export const QuillEditor = React.forwardRef(
  ({ value, onChange, placeholder, className }, ref) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);

    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [linkValue, setLinkValue] = useState("");
    const savedRange = useRef(null);

    const insertLink = url => {
      if (quillRef.current && url) {
        if (savedRange.current) {
          quillRef.current.setSelection(savedRange.current);
        }
        quillRef.current.format("link", url);
      }

      setShowLinkDialog(false);
      setLinkValue("");
      savedRange.current = null;
    };

    useEffect(() => {
      if (!containerRef.current || quillRef.current) return;

      quillRef.current = new Quill(containerRef.current, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              ["link"]
            ],
            handlers: {
              link: () => {
                const range = quillRef.current?.getSelection();

                if (range && range.length > 0) {
                  savedRange.current = range;
                  setShowLinkDialog(true);
                }
              }
            }
          }
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

    const onChangeLink = e => {
      setLinkValue(e.target.value);
    };

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

        {showLinkDialog && (
          <div className="linkDialog">
            <input
              className="linkInputBox"
              type="text"
              value={linkValue}
              onChange={onChangeLink}
              placeholder="Provide URL"
            />
            <UniversalSelect
              value={linkValue}
              defaultValue={{ value: "", label: "Or Select Internal Page" }}
              onChange={onChangeLink}
              options={[{ value: "", label: "Or Select Internal Page" }].concat(
                ROUTES.map(x => ({ label: x.label, value: x.path }))
              )}
              name="Ted"
            />
            <div className="dialogActions">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowLinkDialog(false);
                  savedRange.current = null;
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={() => insertLink(linkValue)}>
                Insert
              </Button>
            </div>
          </div>
        )}
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
