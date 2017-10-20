"use strict";


let React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.browserHistory,
    Layout = require("./pages/Layout.js"),
    Home = require("./pages/Home.js"),
    ConfigPage = require("./pages/ConfigPage.js");



module.exports = (
	<Router history={browserHistory} >
        <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route path="config" component={ConfigPage} />
        </Route>
    </Router>
);
