import React from 'react';
let ajax = require('superagent');

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appData: {
                appName: '',
                appLogo: '',
                briefDescription: '',
                description: '',
                installInstructions: '',
                installLink: '',
                demoGuide: '',
                contactEmail: '',
                chatterURL: ''
            }
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
						this.setState({appData: {
                            appName: parsedResp['appName'],
                            appLogo: parsedResp['appLogoPreview'],
                            briefDescription: parsedResp['briefDescription'],
                            description: parsedResp['description'],
                            installLink: parsedResp['installationLink'],
                            installInstructions: parsedResp['installInstructions'],
                            demoGuide: parsedResp['demoGuide'],
                            contactEmail: parsedResp['contactEmail'],
                            chatterURL: parsedResp['chatterURL']
                        }});
	                } else {
	                    console.log('fail');
	                    console.log(error);
	                }
	            });
		}
	}


    render() {


        return (

            <div class="mainArea">
                <div class="container">
                    <div class="row row_eq">
                        <div class="col-xs-6 col-md-4">
                            <img src={this.state.appData.appLogo} />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-8 descriptArea">
                            <div class="page-header">
                                <h1>{this.state.appData.appName}</h1>
                                <h5>{this.state.appData.briefDescription}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                    <div class="row">
                        <h4>{this.state.appData.description}</h4>
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-sm-4">
                            <h2><small>Package Links:</small></h2>
                            <ul class="list-group">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                        <div class="col-xs-6 col-sm-4">
                            <h2><small>Demo Scripts:</small></h2>
                            <ul class="list-group">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                        <div class="col-xs-6 col-sm-4">
                            <h2><small>Troubleshooting Guide:</small></h2>
                            <ul class="list-group">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                    <div class="row">
                        {this.state.appData.installInstructions}
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                    <div class="row">
                        {this.state.appData.demoGuide}
                    </div>
                    <div class="row">
                        <hr class="featurette-divider" />
                    </div>
                    <div class="row contactArr">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            {this.state.appData.contactEmail}
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            {this.state.appData.chatterURL}
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
