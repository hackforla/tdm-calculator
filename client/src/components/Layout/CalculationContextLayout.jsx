import React from "react";
import { useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import ConfigContext from "../../contexts/ConfigContext";
import CalculationsContext from "../../contexts/CalculationsContext";

const CalculationContextLayout = () => {
  const { configs, calculations } = useLoaderData();

  return (
    <div>
      <ConfigContext.Provider value={configs}>
        <CalculationsContext.Provider value={calculations}>
          <Outlet />
        </CalculationsContext.Provider>
      </ConfigContext.Provider>
    </div>
  );
};

CalculationContextLayout.propTypes = {
  contentContainerRef: PropTypes.any
};

export default CalculationContextLayout;
