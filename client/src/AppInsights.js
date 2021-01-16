// AppInsights.js
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory({ basename: "" });
const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: "b04010da-8444-48d2-a8e1-fcc931a8330d",
    //instrumentationKey: "4965664a-5e02-4704-98a4-7c08c5d238ac",
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});
appInsights.loadAppInsights();
export { reactPlugin, appInsights };
