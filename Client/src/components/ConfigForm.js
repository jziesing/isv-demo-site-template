/*
 *  @configForm.js
 *
 *      props:
 *          configPword (password used in header to update )
 *
 *      state:
 *        (vars used in site_data.json)
 *          appName (string)
 *          appLogo (string)
 *          appLogoFile (string)
 *          briefDescription (string)
 *          description (string)
 *          packageLinks (array[{label, url}])
 *          demoGuides (array[{label, url}])
 *          setupInstructions (array[{label, url}])
 *          contactEmail (string)
 *          chatterURL (string)
 *        (other vars for the form)
 *          packageLinksAdderFields (array[{label, value, type, id}])
 *          demoGuidesAdderFields (array[{label, value, type, id}])
 *          setupInstructionsAdderFields (array[{label, value, type, id}])
 *
 *      functions:
 *          constructor()
 *          componentWillMount()
 *          render()
 *          tryInstructionsUpload()
 *      bound functions:
 *          handleFormChange()
 *          handleFormSubmit()
 *          handleInstallLinkChange()
 *          handleInstallLinkEnter()
 *
 */


import React from 'react';
import {Link, browserHistory} from 'react-router';
import Adder from './Adder.js';
let ajax = require('superagent');
let FormData = require('form-data');

class ConfigForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appName: '',
            appLogo: null,
            appLogoFile: null,
            briefDescription: '',
            description: '',
            packageLinks: null,
            demoGuides: null,
            setupInstructions: null,
            contactEmail: '',
            chatterURL: '',
            packageLinksAdderFields: [
                {
                    label: 'Label for Package',
                    value: '',
                    type: 'text',
                    id: 'packageLabel'
                }, {
                    label: 'URL',
                    value: '',
                    type: 'url',
                    id: 'packageLink'
                }
            ],
            demoGuidesAdderFields: [
                {
                    label: 'Label for Demo Guide',
                    value: '',
                    type: 'text',
                    id: 'demoGuideLabel'
                }, {
                    label: 'URL',
                    value: '',
                    type: 'url',
                    id: 'demoGuideURL'
                }
            ],
            setupInstructionsAdderFields: [
                {
                    label: 'Label for Setup Intstructions',
                    value: '',
                    type: 'text',
                    id: 'setupInstructionsLabel'
                }, {
                    label: 'URL',
                    value: '',
                    type: 'url',
                    id: 'setupInstructionsURL'
                }
            ]
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePackageLinksEnter = this.handlePackageLinksEnter.bind(this);
        this.handlePackageLinksChange = this.handlePackageLinksChange.bind(this);
        this.handleDemoGuidesEnter = this.handleDemoGuidesEnter.bind(this);
        this.handleDemoGuidesChange = this.handleDemoGuidesChange.bind(this);
        this.handleSetupInstructionsEnter = this.handleSetupInstructionsEnter.bind(this);
        this.handleSetupInstructionsChange = this.handleSetupInstructionsChange.bind(this);
        this.handlePackageLinkRemove = this.handlePackageLinkRemove.bind(this);
        this.handleDemoGuideRemove = this.handleDemoGuideRemove.bind(this);
        this.handleSetupInstructionRemove = this.handleSetupInstructionRemove.bind(this);
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
                        appLogo: parsedResp['appLogo'],
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
                    appLogoFile: file,
                    appLogo: reader.result
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
            
            ajax.post(updateUrl)
                .set({
                    'Content-Type': 'application/json',
                    'sfdc_pwd': pword
                }).send({
                    appName: this.state.appName,
                    appLogo: this.state.appLogo,
                    appLogoFile: this.state.appLogoFile,
                    briefDescription: this.state.briefDescription,
                    description: this.state.description,
                    packageLinks: this.state.packageLinks,
                    demoGuides: this.state.demoGuides,
                    setupInstructions: this.state.setupInstructions,
                    contactEmail: this.state.contactEmail,
                    chatterURL: this.state.chatterURL
                }).end((error, response) => {
                    if(!error && response.status == 200) {
                        console.log('success : confirg form submited');
                        browserHistory.push('/');
                    } else {
                        // !TODO!, add errors if form fails
                        console.log('error');
                    }
                    browserHistory.push('/');
                });
        } else {
            console.log('no password in state');
            browserHistory.push('/');
        }
    }

    handlePackageLinksChange(event) {
        let fields = this.state.packageLinksAdderFields,
            fieldIndex = null,
            field = null;
        for(let i=0; i<fields.length; ++i) {
            if(fields[i].id == event.target.id) {
                fieldIndex = i;
                field = fields[i];
                field.value = event.target.value;
            }
        }
        fields[fieldIndex] = field;
        this.setState({packageLinksAdderFields: fields});
    }

    handlePackageLinksEnter(event) {

        let fields = this.state.packageLinksAdderFields,
            objToAdd = {};
        for(let i=0; i<fields.length; ++i) {
            if(fields[i].id == 'packageLabel') {
                objToAdd.label = fields[i].value;
            }
            if(fields[i].id == 'packageLink') {
                if(!fields[i].value.startsWith('http')) {
                    objToAdd.url = 'http://' + fields[i].value;
                } else {
                    objToAdd.url = fields[i].value;
                }
            }
            fields[i].value = '';
        }
        if(this.state.packageLinks == null) {
            let arrToAdd = [objToAdd];
            this.setState({packageLinksAdderFields: fields, packageLinks: arrToAdd});
        } else {
            let currPackageLinks = this.state.packageLinks;
            currPackageLinks.push(objToAdd);
            this.setState({packageLinksAdderFields: fields, packageLinks: currPackageLinks});
        }
    }

    handleDemoGuidesChange(event) {
        let fields = this.state.demoGuidesAdderFields,
            fieldIndex = null,
            field = null;
        for(let i=0; i<fields.length; ++i) {
            if(fields[i].id == event.target.id) {
                fieldIndex = i;
                field = fields[i];
                field.value = event.target.value;
            }
        }
        fields[fieldIndex] = field;
        this.setState({demoGuidesAdderFields: fields});
    }

    handleDemoGuidesEnter(event) {
        let fields = this.state.demoGuidesAdderFields,
            objToAdd = {};
        for(let i=0; i<fields.length; ++i) {
            if(fields[i].id == 'demoGuideLabel') {
                objToAdd.label = fields[i].value;
            }
            if(fields[i].id == 'demoGuideURL') {
                if(!fields[i].value.startsWith('http')) {
                    objToAdd.url = 'http://' + fields[i].value;
                } else {
                    objToAdd.url = fields[i].value;
                }
            }
            fields[i].value = '';
        }

        if(this.state.demoGuides == null) {
            let arrToAdd = [objToAdd];
            this.setState({demoGuidesAdderFields: fields, demoGuides: arrToAdd});
        } else {
            let currDemoGuides = this.state.demoGuides;
            currDemoGuides.push(objToAdd);
            this.setState({demoGuidesAdderFields: fields, demoGuides: currDemoGuides});
        }
    }

    handleSetupInstructionsChange(event) {
        let fields = this.state.setupInstructionsAdderFields,
            fieldIndex = null,
            field = null;
        for(let i=0; i<fields.length; ++i) {
            if(fields[i].id == event.target.id) {
                fieldIndex = i;
                field = fields[i];
                field.value = event.target.value;
            }
        }
        fields[fieldIndex] = field;
        this.setState({setupInstructionsAdderFields: fields});
    }

    handleSetupInstructionsEnter(event) {
        let fields = this.state.setupInstructionsAdderFields,
            objToAdd = {};
        for(let i=0; i<fields.length; ++i) {
            if(fields[i].id == 'setupInstructionsLabel') {
                objToAdd.label = fields[i].value;
            }
            if(fields[i].id == 'setupInstructionsURL') {
                if(!fields[i].value.startsWith('http')) {
                    objToAdd.url = 'http://' + fields[i].value;
                } else {
                    objToAdd.url = fields[i].value;
                }
            }
            fields[i].value = '';
        }
        if(this.state.setupInstructions == null) {
            let arrToAdd = [objToAdd];
            this.setState({setupInstructionsAdderFields: fields, setupInstructions: arrToAdd});
        } else {
            let currSetupInstructions = this.state.setupInstructions;
            currSetupInstructions.push(objToAdd);
            this.setState({setupInstructionsAdderFields: fields, setupInstructions: currSetupInstructions});
        }
    }

    packageLinksMarkup() {
        if(Array.isArray(this.state.packageLinks)) {
            return this.state.packageLinks.map((obj, index) => {
                return (
                    <li key={index} class="list-group-item">
                        <span class="badge" onClick={this.handlePackageLinkRemove} id={index}><i class="icon-remove"></i></span>
                        <h3><span class="label label-default"><a target="_blank" href={obj.url}>{obj.label}</a></span></h3>
                    </li>
                );
            });
        } else {
            return (
                <li key="0" class="list-group-item">
                    no packages added
                </li>
            );
        }
    }

    demoGuidesMarkup() {
        if(Array.isArray(this.state.demoGuides)) {
            return this.state.demoGuides.map((obj, index) => {
                return (
                    <li key={index} class="list-group-item">
                        <span class="badge" onClick={this.handleDemoGuideRemove} id={index}><i class="icon-remove"></i></span>
                        <h3><span class="label label-default"><a target="_blank" href={obj.url}>{obj.label}</a></span></h3>
                    </li>
                );
            });
        } else {
            return (
                <li key="0" class="list-group-item">
                    no demo guides added
                </li>
            );
        }
    }

    setupInstructionsMarkup() {
        if(Array.isArray(this.state.setupInstructions)) {
            return this.state.setupInstructions.map((obj, index) => {
                return (
                    <li key={index} class="list-group-item">
                        <span class="badge" onClick={this.handleSetupInstructionRemove} id={index}><i class="icon-remove"></i></span>
                        <h3><span class="label label-default"><a target="_blank" href={obj.url}>{obj.label}</a></span></h3>
                    </li>
                );
            });
        } else {
            return (
                <li key="0" class="list-group-item">
                    no setup instructions added
                </li>
            );
        }
    }

    handlePackageLinkRemove(event) {
        let packgeLinks = this.state.packageLinks,
            indexToRem = parseInt(event.target.id);
        packgeLinks.splice(indexToRem, 1);
        if(packgeLinks.length == 0) { packgeLinks = null; }
        this.setState({packageLinks: packgeLinks});
    }

    handleDemoGuideRemove(event) {
        let demoGuids = this.state.demoGuides,
            indexToRem = parseInt(event.target.id);
        demoGuids.splice(indexToRem, 1);
        if(demoGuids.length == 0) { demoGuids = null; }
        this.setState({demoGuides: demoGuids});
    }

    handleSetupInstructionRemove(event) {
        let setupInstructs = this.state.setupInstructions,
            indexToRem = parseInt(event.target.id);
        setupInstructs.splice(indexToRem, 1);
        if(setupInstructs.length == 0) { setupInstructs = null; }
        this.setState({setupInstructions: setupInstructs});
    }

    render() {

        let imgPrevMarkup = null;

        if(this.state.appLogo != null) {
            imgPrevMarkup = (<img src={this.state.appLogo} />);
        }

        return (
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-8 col-md-offset-2">
                    <form class="form-horizontal" onSubmit={this.handleFormSubmit}>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="appName">App Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="appName" placeholder="App Name" value={this.state.appName} onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="appLogo">App Logo</label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" accept="image/*" id="appLogo" placeholder="App Logo" onChange={this.handleFormChange} />
                                {imgPrevMarkup}
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="briefDescription">Brief Description</label>
                            <div class="col-sm-10">
                                <input type="text"  class="form-control" id="briefDescription" placeholder="Brief Description" value={this.state.briefDescription} onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="description">Description</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" rows="2" id="description" value={this.state.description} onChange={this.handleFormChange}></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="packageLinks">Package Links</label>
                            <div class="col-sm-5">
                                <Adder buttonLabel="add" fields={this.state.packageLinksAdderFields} handleChange={this.handlePackageLinksChange} handleEnter={this.handlePackageLinksEnter} />
                            </div>
                            <div class="col-sm-5">
                                <ul class="list-group">{this.packageLinksMarkup()}</ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="demoGuides">Demo Guides</label>
                            <div class="col-sm-5">
                                <Adder buttonLabel="add" fields={this.state.demoGuidesAdderFields} handleChange={this.handleDemoGuidesChange} handleEnter={this.handleDemoGuidesEnter} />
                            </div>
                            <div class="col-sm-5">
                                {this.demoGuidesMarkup()}
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="demoGuides">Setup Instructions</label>
                            <div class="col-sm-5">
                                <Adder buttonLabel="add" fields={this.state.setupInstructionsAdderFields} handleChange={this.handleSetupInstructionsChange} handleEnter={this.handleSetupInstructionsEnter} />
                            </div>
                            <div class="col-sm-5">
                                {this.setupInstructionsMarkup()}
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="contactEmail">Contact Email</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="contactEmail" placeholder="Contact Email" value={this.state.contactEmail} onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="chatterURL">Chatter Group URL</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="chatterURL" placeholder="Chatter Group URL" value={this.state.chatterURL} onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-default">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConfigForm;
