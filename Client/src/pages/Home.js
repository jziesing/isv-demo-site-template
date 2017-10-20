import React from 'react';
let ajax = require('superagent');

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appName: '',
            appLogo: '',
            appLogoFile: '',
            briefDescription: '',
            description: '',
            packageLinks: null,
            demoGuides: null,
            setupInstructions: null,
            contactEmail: '',
            chatterURL: ''
		};
    }
	// call pub routes for app info
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
                            appName: parsedResp['appName'],
                            appLogo: parsedResp['appLogo'],
                            appLogoFile: parsedResp['appLogoFile'],
                            briefDescription: parsedResp['briefDescription'],
                            description: parsedResp['description'],
                            packageLinks: parsedResp['packageLinks'],
                            demoGuides: parsedResp['demoGuides'],
                            setupInstructions: parsedResp['setupInstructions'],
                            contactEmail: parsedResp['contactEmail'],
                            chatterURL: parsedResp['chatterURL']
                        });
	                } else {
	                    console.log('fail');
	                    console.log(error);
	                }
	            });
		}
	}

    packageLinksMarkup() {
        if(this.state.packageLinks != null) {
            return this.state.packageLinks.map((obj, index) => {
                return (<li key={index} class="list-group-item"><a target="_blank" href={obj.url}>{obj.label}</a></li>);
            });
        } else {
            return null;
        }
    }

    demoGuidesMarkup() {
        if(this.state.demoGuides != null) {
            return this.state.demoGuides.map((obj, index) => {
                return (<li key={index} class="list-group-item"><a target="_blank" href={obj.url}>{obj.label}</a></li>);
            });
        } else {
            return null;
        }
    }

    setupInstructionsMarkup() {
        if(this.state.setupInstructions != null) {
            return this.state.setupInstructions.map((obj, index) => {
                return (<li key={index} class="list-group-item"><a target="_blank" href={obj.url}>{obj.label}</a></li>);
            });
        } else {
            return null;
        }
    }


    render() {

        let contactEmailHref = 'mailto:' + this.state.contactEmail;

        return (

            <div class="mainArea">
                <div class="container">
                    <div class="row">
                        <div class="media">
                            <div class="media-left">
                                <a href="#">
                                  <img class="media-object" src={this.state.appLogo} alt="logo" />
                                </a>
                            </div>
                            <div class="media-body headingContainer">
                                <h1 class="media-heading">{this.state.appName}</h1>
                                <h5>{this.state.briefDescription}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                    <div class="row">
                        <h4>{this.state.description}</h4>
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-sm-4">
                            <h2><small>Package Links:</small></h2>
                            <ul class="list-group">
                                {this.packageLinksMarkup()}
                            </ul>
                        </div>
                        <div class="col-xs-6 col-sm-4">
                            <h2><small>Demo Guides:</small></h2>
                            <ul class="list-group">
                                {this.demoGuidesMarkup()}
                            </ul>
                        </div>
                        <div class="col-xs-6 col-sm-4">
                            <h2><small>Setup Instructions:</small></h2>
                            <ul class="list-group">
                                {this.setupInstructionsMarkup()}
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                    <div class="row contactArr">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <a href={contactEmailHref} >{this.state.contactEmail}</a>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            {this.state.chatterURL}
                        </div>
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                </div>
                <div id="push" />
            </div>
        );
    }
}

export default Home;
