import React from 'react';
import { Link } from 'react-router';
import Footer from '../components/Footer.js';
let ajax = require('superagent');
class Layout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			appName: 'testing',
			styleURL: ''
		}
	}
	componentWillMount() {
		if(typeof window !== 'undefined' && window.document && window.document.createElement) {
			let appDataURL = '/api/app-info/';
			ajax.get(appDataURL)
				.send()
				.end((error, response) => {
	                if(!error && response.status == 200) {
	                    console.log('success');
	                    console.log(response);
						let parsedResp = JSON.parse(response.text);
                        console.log(parsedResp);
						this.setState({
                            styleURL: parsedResp['styleURL']
                        });
	                } else {
	                    console.log('fail');
	                    console.log(error);
	                }
	            });
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
					<link href={this.state.styleURL} rel="stylesheet" />
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
