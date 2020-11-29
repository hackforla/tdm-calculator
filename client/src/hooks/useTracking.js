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

export const useTracking = (trackingId = "G-MW23VES3G6") => {
  const { listen } = useHistory();

  useEffect(() => {
    const unlisten = listen(location => {
      if (!window.gtag) return;
      if (!trackingId) {
        console.error(
          "Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`."
        );
        return;
      }

      window.gtag("config", trackingId, { page_path: location.pathname });
    });

    return unlisten;
  }, [trackingId, listen]);
};
