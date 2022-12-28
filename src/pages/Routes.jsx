import React from "react";
// eslint-disable-next-line
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Window from "../components/Window";
import VSCode from "../components/VSCode";
import Resume from "../components/Resume";
import Git from "../components/Git";
import Projects from "../components/Projects";
import MC from "../components/MC";

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Window} />
				<Route path="/vscode" exact component={VSCode} />
				<Route path="/mc" exact component={MC} />
				<Route path="/resume" exact component={Resume} />
				<Route path="/git" exact component={Git} />
				<Route path="/projects" exact component={Projects} />
			</Switch>
		</Router>
	);
};

export default Routes;
