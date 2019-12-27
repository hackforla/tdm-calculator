import React, { useEffect, useRef } from "react";

const Toast = ({ children, remove }) => {
  const removeRef = useRef();
  removeRef.current = remove;

  useEffect(() => {
    const duration = 5000;
    const id = setTimeout(() => removeRef.current(), duration);

    return () => clearTimeout(id);
  }, []);

  return (
    <div
      style={{
        border: "2px solid transparent",
        backgroundColor: "#fafafa",
        borderRadius: "4px",
        maxWidth: "480px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, .2)",
        marginTop: "16px",
        display: "flex",
        position: "relative",
        cursor: "pointer"
      }}
    >
      <div
        style={{
          padding: "16px 24px",
          lineHeight: "1.4"
        }}
      >
        {children}
      </div>
      <div>
        <button
          onClick={remove}
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: "16px",
            marginTop: "8px",
            marginRight: "8px",
            cursor: "pointer"
          }}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Toast;
