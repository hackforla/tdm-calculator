import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  contentContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "row",
    minHeight: "calc(100vh - 71px - 5em)"
  },
  content: props => ({
    boxSizing: "border-box",
    // overflow: "auto",
    flexBasis: "auto",
    flexGrow: "1",
    flexShrink: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${props.containsTable ? 20 : 40}px 2em 10px 2em`
  }),
  "@media (max-width:768px)": {
    contentContainer: {
      flexDirection: "column"
    }
  }
});

const ContentContainer = ({
  customSidebar: CustomSidebar,
  contentContainerRef,
  children,
  ...props
}) => {
  const classes = useStyles(props);

  return (
    <div className={classes.contentContainer}>
      {CustomSidebar && <CustomSidebar />}
      <div className={classes.content} ref={contentContainerRef}>
        {children}
      </div>
    </div>
  );
};

ContentContainer.propTypes = {
  customSidebar: PropTypes.elementType,
  contentContainerRef: PropTypes.object,
  children: PropTypes.node.isRequired,
  props: PropTypes.object
};

export default ContentContainer;
