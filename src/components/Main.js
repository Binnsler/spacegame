// Libraries
import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Home from "components/pages/Home.js";

const Main = () => (
    <div className="appBody">
        <Switch>
            <Route exact path="/" component={ Home }/>
        </Switch>
    </div>
);

export default Main;
