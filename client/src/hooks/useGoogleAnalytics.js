import React from "react";
import { useLocation } from "react-router-dom";

import analytics from "./analytics";

/*
  See this article for explanation:
  https://raptis.wtf/blog/custom-hook-to-connect-google-analytics-in-react/
*/

export default function useGoogleAnalytics() {
  const location = useLocation();

  React.useEffect(() => {
    analytics.init();
  }, []);

  React.useEffect(() => {
    const currentPath = location.pathname + location.search;
    analytics.sendPageview(currentPath);
  }, [location]);
}
