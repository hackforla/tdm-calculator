import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
// import SortableFaq from "./SortableFaq";
import Faq from "./Faq";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   SortableContext,
//   verticalListSortingStrategy
// } from "@dnd-kit/sortable";

const useStyles = createUseStyles({
  categoryContainer: {
    minWidth: "60vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f2940",
    color: "white",
    padding: ".4em",
    marginBottom: "0.6em",
    gridColumn: "h-end",
    paddingRight: "0.5em",
    height: "20px"
  }
});

const FaqCategory = forwardRef((props, ref) => {
  const { category, admin, expandFaq, collapseFaq, attributes, listeners } =
    props;
  const classes = useStyles();

  return (
    <div>
      <div className={classes.categoryContainer}>
        <h3>{category.name}</h3>
        {admin ? (
          <FontAwesomeIcon
            style={{
              cursor: "grab",
              fontSize: "1.5em",
              paddingTop: "0.11em",
              paddingRight: "0em",
              color: "white"
            }}
            ref={ref}
            {...attributes}
            {...listeners}
            icon={faGripHorizontal}
          />
        ) : null}
      </div>
      {/* <SortableContext
        items={category.faqs}
        strategy={verticalListSortingStrategy}
      > */}
      {category.faqs.map(faq => {
        return (
          // <SortableFaq key={JSON.stringify(faq)} id={`faq${faq.id}`}>
          <Faq
            faq={faq}
            key={JSON.stringify(faq)}
            admin={admin}
            expandFaq={expandFaq}
            collapseFaq={collapseFaq}
          />
          // </SortableFaq>
        );
      })}
      {/* </SortableContext> */}
    </div>
  );
});

FaqCategory.displayName = "FaqCategory";

FaqCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    displayOrder: PropTypes.number.isRequired,
    faqs: PropTypes.array
  }),
  admin: PropTypes.bool.isRequired,
  expandFaq: PropTypes.func.isRequired,
  collapseFaq: PropTypes.func.isRequired,
  attributes: PropTypes.any,
  listeners: PropTypes.any,
  setActivatorNodeRef: PropTypes.any
};

export default FaqCategory;
