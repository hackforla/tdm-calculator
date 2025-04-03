import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { createPortal } from "react-dom";
import ToastContext from "./ToastContext";
import Toast from "./Toast";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  toast: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  }
});

const generateUEID = () => {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ("000" + first.toString(36)).slice(-3);
  second = ("000" + second.toString(36)).slice(-3);

  return first + second;
};

const withToastProvider = Component => {
  const ToastProvider = props => {
    const { contentContainerRef, appContainerRef } = props;
    const classes = useStyles();
    const [toasts, setToasts] = useState([]);
    const add = content => {
      const id = generateUEID();
      setToasts([...toasts, { id, content }]);
    };

    const remove = id => setToasts(toasts.filter(t => t.id !== id));
    const contentContainer = contentContainerRef
      ? contentContainerRef.current
      : null;
    const appContainer = appContainerRef ? appContainerRef.current : null;

    return (
      <ToastContext.Provider value={{ add, remove }}>
        <Component {...props} />
        {createPortal(
          <div className={classes.toast}>
            {toasts.map(t => (
              <Toast key={t.id} remove={() => remove(t.id)}>
                {t.content}
              </Toast>
            ))}
          </div>,
          contentContainer
            ? contentContainer
            : appContainer
              ? appContainer
              : document.body
        )}
      </ToastContext.Provider>
    );
  };

  ToastProvider.propTypes = {
    contentContainerRef: PropTypes.shape({
      current: PropTypes.object
    }),
    appContainerRef: PropTypes.shape({
      current: PropTypes.object
    })
  };

  return ToastProvider;
};

export default withToastProvider;
