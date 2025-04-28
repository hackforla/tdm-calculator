import React, { useRef, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import { ROUTES } from "../../../src/routes.jsx";
import "../../styles/AdminQuill.scss";
import Button from "../Button/Button";
import UniversalSelect from "../UI/UniversalSelect.jsx";

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

  const onChangeLink = e => {
    setLinkValue(e.target.value);
  };

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
};

Quill.propTypes = {
  modules: PropTypes.any
};

export default Quill;
