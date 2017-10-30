import React from 'react';
import { browserHistory } from 'react-router';
import ConfigForm from '../components/ConfigForm.js';
let ajax = require('superagent');

class ConfigPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pword: '',
            inputPword: ''
        };
        this.handlePwordChange = this.handlePwordChange.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handlePwordChange(event) {
        this.setState({inputPword: event.currentTarget.value})
    }

    handlePasswordSubmit(event) {
        if(this.state.inputPword.length > 0) {
            let loginUrl = '/api/login';
            ajax.post(loginUrl)
                .send(this.state)
                .end((error, response) => {
                    if(!error && response) {
                        console.log('success');
                        this.setState({
                            pword: this.state.inputPword,
                            inputPword: ''
                        });
                    } else {
                        console.log('fail');
                        console.log(error);
                        browserHistory.push('/');
                    }
                }
            );
        }
    }

    handleCancel() {
        browserHistory.push('/');
    }

    formMarkup() {
        if(this.state.pword.length > 0) {
            return (
                <div class="container">
                    <div class="row">
                        <div class="col-xs-6 col-md-4"></div>
                        <div class="col-xs-12 col-sm-6 col-md-8">
                            <h1>Configure Your Landing Page</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-md-4"></div>
                        <div class="col-xs-12 col-sm-8 col-md-6">
                            <h5>ISV App Demo Kit Best Practices:</h5>
                            <ul class="list-group">
                                <li class="list-group-item">Partner hosted landing page</li>
                                <li class="list-group-item">Demo Packages (unmanaged or managed, managed is recommended to allow updates)</li>
                                <li class="list-group-item">Demo Guides (pdf on how to demo what)</li>
                                <li class="list-group-item">Setup Instructions (pdf on how to setup the demos)</li>
                                <li class="list-group-item">A dedicated contact for technical and demo help</li>
                            </ul>
                        </div>
                    </div>
                    <ConfigForm configPword={this.state.pword} />
                </div>
            );
        } else {
            return (
                <div class="modal show" role="dialog">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" onClick={this.handleCancel} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Enter Config Password</h4>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" class="form-control" id="exampleInputPassword1" value={this.state.inputPword} onChange={this.handlePwordChange} placeholder="Password" />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" onClick={this.handleCancel} data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.handlePasswordSubmit} class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
            );
        }
    }

    render() {

        let markup = this.formMarkup();

        return (
            <div class="mainArea">
                {this.formMarkup()}
                <div id="push" />
            </div>
        );
    }
}

export default ConfigPage;
