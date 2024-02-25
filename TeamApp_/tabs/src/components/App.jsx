import React from "react"; 
// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme } from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import { Connexion } from "./sample/Connexion";
import { Information } from "./sample/Information";
import "./App.css";
import TabConfig from "./TabConfig";
import { useTeams } from "@microsoft/teamsfx-react";
import { Welcome } from "./sample/Welcome";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { theme } = useTeams({})[0];
  return (
    <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
      <Router>
        <Route exact path="/">
          <Redirect to="/connect" />
        </Route>
        <>
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/termsofuse" component={TermsOfUse} />
          <Route exact path="/tab" component={Tab} />
          <Route exact path="/tab/accueil" component={Welcome} />
          <Route path="/tab/information" component={Information} />
          <Route exact path="/config" component={TabConfig} />
          <Route exact path="/connect" component={Connexion} />
        </>
      </Router>
    </Provider>
  );
}
