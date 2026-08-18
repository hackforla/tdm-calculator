import React from "react";
import { useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import CalculationsContext from "../../contexts/CalculationsContext";

const CalculationContextLayout = () => {
  const { calculations } = useLoaderData();

  return (
    <div>
      <CalculationsContext.Provider value={calculations}>
        <Outlet />
      </CalculationsContext.Provider>
    </div>
  );
};

CalculationContextLayout.propTypes = {
  contentContainerRef: PropTypes.any
};

export default CalculationContextLayout;
