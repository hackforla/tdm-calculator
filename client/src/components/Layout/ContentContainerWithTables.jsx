import React from "react";
import PropTypes from "prop-types";
import ContentContainer from "./ContentContainer";

const ContentContainerWithTables = ({
  customSidebar,
  contentContainerRef,
  children
}) => {
  return (
    <ContentContainer
      customSidebar={customSidebar}
      contentContainerRef={contentContainerRef}
      containsTable={true}
    >
      {children}
    </ContentContainer>
  );
};

ContentContainerWithTables.propTypes = {
  customSidebar: PropTypes.elementType,
  contentContainerRef: PropTypes.object,
  children: PropTypes.node.isRequired,
  props: PropTypes.object
};

export default ContentContainerWithTables;
