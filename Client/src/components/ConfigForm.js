import React from 'react';
import {Link, browserHistory} from 'react-router';
let ajax = require('superagent');
let FormData = require('form-data');

class ConfigForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appName: '',
            appLogo: null,
            appLogoPreview: null,
            briefDescription: '',
            description: '',
            installInstructions: '',
            installLink: '',
            demoGuide: '',
            contactEmail: '',
            chatterURL: '',
            installInstructionsUpload: null
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        let configInfoUrl = '/api/app-info';
        ajax.get(configInfoUrl)
            .send()
            .end((error, response) => {
                if(!error && response) {
                    console.log('success');
                    console.log(response);
                    let parsedResp = JSON.parse(response.text);
                    console.log(parsedResp);
                    this.setState({
                        appName: parsedResp['appName'],
                        briefDescription: parsedResp['briefDescription'],
                        appLogoPreview: parsedResp['appLogoPreview'],
                        description: parsedResp['description'],
                        installLink: parsedResp['installationLink'],
                        installInstructions: parsedResp['installInstructions'],
                        demoGuide: parsedResp['demoGuide'],
                        contactEmail: parsedResp['contactEmail'],
                        chatterURL: parsedResp['chatterURL']
                    });
                } else {
                    console.log('fail');
                    console.log(error);
                }
            }
        );
    }

    tryInstructionsUpload() {

        console.log(this.state.installInstructionsUpload);
        let uploadURL = '/api/upload-instructions/';
        let aForm = new FormData();
        let filUpped = document.getElementById('installInstructionsUpload').files;
        for(var key in filUpped) {
            if(filUpped.hasOwnProperty(key) && filUpped[key] instanceof File) {
                aForm.append(key, filUpped[key]);
            }
        }
        ajax.post(uploadURL)
            .send(aForm)
            .end((error, response) => {
                if(!error && response) {
                    console.log('success');
                    console.log(response);
                } else {
                    console.log('fail');
                    console.log(error);
                }
            }
        );
    }

    handleFormChange(event) {
        switch(event.target.id) {
            case 'appName':
                this.setState({appName: event.target.value});
                break;
            case 'appLogo':
                event.preventDefault();
                let reader = new FileReader();
                let file = event.target.files[0];

                reader.onloadend = () => {
                  this.setState({
                    appLogo: file,
                    appLogoPreview: reader.result
                  });
                }
                reader.readAsDataURL(file);
                break;
            case 'briefDescription':
				this.setState({briefDescription: event.target.value});
                break;
            case 'description':
				this.setState({description: event.target.value});
                break;
            case 'installInstructions':
				this.setState({installInstructions: event.target.value});
                break;
            case 'installInstructionsUpload':
                this.setState({installInstructionsUpload: event.target.value});
                this.tryInstructionsUpload();
                break;
            case 'installLink':
				this.setState({installLink: event.target.value});
                break;
            case 'demoGuide':
				this.setState({demoGuide: event.target.value});
                break;
            case 'contactEmail':
				this.setState({contactEmail: event.target.value});
                break;
            case 'chatterURL':
				this.setState({chatterURL: event.target.value});
                break;
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log('handleFormSubmit : ');
        let pword = this.props.configPword,
            updateUrl = '/api/config-app';

        if(typeof(pword) != 'undefined'  && pword != '') {
            console.log('!!!!!!! : ');
            ajax.post(updateUrl)
                .set({
                    'Content-Type': 'application/json',
                    'sfdc_pwd': pword
                }).send(this.state)
                .end((error, response) => {
                    if(!error && response.status == 200) {

                        console.log('success call fr mee');
                        console.log(response);
                        browserHistory.push('/');
                    } else {
                        console.log('error');
                    }
                    browserHistory.push('/');
                });
        } else {
            console.log('%%%^%^^^^^^^^^ : ');
            browserHistory.push('/');
        }
    }

    render() {

        let imgPrevMarkup = null;

        if(this.state.appLogoPreview != null) {
            imgPrevMarkup = (<img src={this.state.appLogoPreview} />);
        }

        return (
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-8 col-md-offset-2">
                    <form onSubmit={this.handleFormSubmit}>
                        <div class="form-group">
                            <label for="appName">App Name</label>
                            <input type="text" class="form-control" id="appName" placeholder="App Name" value={this.state.appName} onChange={this.handleFormChange} />
                        </div>
                        <div class="form-group">
                            <label for="appLogo">App Logo</label>
                            <input type="file" class="form-control" accept="image/*" id="appLogo" placeholder="App Logo" onChange={this.handleFormChange} />
                            {imgPrevMarkup}
                        </div>
                        <div class="form-group">
                            <label for="briefDescription">Brief Description</label>
                            <input type="text"  class="form-control" id="briefDescription" placeholder="Brief Description" value={this.state.briefDescription} onChange={this.handleFormChange} />
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" rows="2" id="description" value={this.state.description} onChange={this.handleFormChange}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="installInstructionsUpload">Upload Setup/Installation Instructions</label>
                            <input type="file" accept="application/pdf" class="form-control" id="installInstructionsUpload" placeholder="Link to Setup/Installation Instructions" onChange={this.handleFormChange} />
                        </div>
                        <div class="form-group">
                            <label for="installInstructions">Link to Setup/Installation Instructions</label>
                            <input type="text" class="form-control" id="installInstructions" placeholder="Link to Setup/Installation Instructions" value={this.state.installInstructions} onChange={this.handleFormChange} />
                        </div>
                        <div class="form-group">
                            <label for="installLink">Link to Package/ Install Link</label>
                            <input type="text" class="form-control" id="installLink" placeholder="Link to Package/ Install Link" value={this.state.installLink} onChange={this.handleFormChange} />
                        </div>
                        <div class="form-group">
                            <label for="demoGuide">Link to Demo Guide</label>
                            <input type="text" class="form-control" id="demoGuide" placeholder="Link to Demo Guide" value={this.state.demoGuide} onChange={this.handleFormChange} />
                        </div>
                        <div class="form-group">
                            <label for="contactEmail">Contact Email</label>
                            <input type="text" class="form-control" id="contactEmail" placeholder="Contact Email" value={this.state.contactEmail} onChange={this.handleFormChange} />
                        </div>
                        <div class="form-group">
                            <label for="chatterURL">Chatter Group URL</label>
                            <input type="text" class="form-control" id="chatterURL" placeholder="Chatter Group URL" value={this.state.chatterURL} onChange={this.handleFormChange} />
                        </div>
                        <button type="submit" class="btn btn-default">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigForm;
