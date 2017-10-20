import React from 'react';
import { Link } from 'react-router';
import Footer from '../components/Footer.js';

class Layout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			appName: 'testing',
		}
	}
    footerBtnType() {
		let currLocc = this.props.location.pathname;
		switch(currLocc) {
			case '':
			case '/':
				return {
					label:"Config",
					path:"config"
				};
				break;
			case 'config':
			case '/config':
				return {
					label:"App",
					path:"/"
				};
				break;
		}
	}

	render() {


	    return (
			<html lang="en">
	          	<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	              	<title>Test</title>
					<link href="/css/bootswatch-simplex.min.css" rel="stylesheet" />
					<link href="/css/fontawesome.min.css" rel="stylesheet" />
					<link href="/css/index.css" rel="stylesheet" />
	          	</head>
	          	<body>
					{ this.props.children }
					<Footer appName={this.state.appName} btnInfo={this.footerBtnType()} />
	              	<script src='/index.js' />
	          	</body>
	      </html>
	    );
  	}
}

export default Layout;
