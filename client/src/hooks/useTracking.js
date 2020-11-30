import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// https://medium.com/javascript-in-plain-english/google-analytics-with-react-router-and-hooks-16d403ddc528

// declare global {
//   interface Window {
//     gtag?: (
//       key: string,
//       trackingId: string,
//       config: { page_path: string }
//     ) => void;
//   }
// }

export const useTracking = trackingId => {
  const { listen } = useHistory();
  const gaTrackingId = trackingId || process.env.REACT_APP_GA_ID;

  useEffect(() => {
    const unlisten = listen(location => {
      if (!window.gtag) return;
      if (!gaTrackingId) {
        console.error(
          "Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`."
        );
        return;
      }

      window.gtag("config", gaTrackingId, {
        page_path: location.pathname,
        page_query_string: location.search
      });
      console.log("useTracking: " + location.pathname + " id: " + gaTrackingId);
    });

    return unlisten;
  }, [gaTrackingId, listen]);
};
