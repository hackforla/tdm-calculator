// AppInsights.js
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";
import { Environment } from "./helpers/Environment";

const browserHistory = createBrowserHistory({ basename: "" });
const reactPlugin = new ReactPlugin();
// The ApplicationInsights Connection String for PROD is not set up yet. Need to replace the PROD version below, once
// the production Application Insights service is set up for production.
const connectionString =
  Environment === "DEV"
    ? "InstrumentationKey=b04010da-8444-48d2-a8e1-fcc931a8330d;IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com/;LiveEndpoint=https://westus.livediagnostics.monitor.azure.com/"
    : Environment === "UAT"
    ? "InstrumentationKey=eb334367-bbba-457f-b034-cf19b47da638;IngestionEndpoint=https://westus2-1.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/"
    : "InstrumentationKey=eb334367-bbba-457f-b034-cf19b47da638;IngestionEndpoint=https://westus2-1.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/";

const appInsights = new ApplicationInsights({
  config: {
    connectionString: connectionString,
    // instrumentationKey: "b04010da-8444-48d2-a8e1-fcc931a8330d",
    //instrumentationKey: "4965664a-5e02-4704-98a4-7c08c5d238ac",
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});
appInsights.loadAppInsights();
export { reactPlugin, appInsights };
