/*
 * @ApiRoutes.js
 */
"use strict";

var fs = require('fs');
let ApiRoutesHelper = require('./ApiRoutesHelper.js');

class ApiRoutes {

    constructor() {
        this.apiHelper = new ApiRoutesHelper();
        this.AppInfo = this.AppInfo.bind(this);
        this.ConfigApp = this.ConfigApp.bind(this);
        this.Login = this.Login.bind(this);
    }
    /*  @route: /api/login
     *     - POST
     */
    Login(req, res) {
        console.log('getting app info LOGGG');
        console.log(process.env.config_password);
        if(req.body.inputPword == process.env.config_password) {
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }
    }
    /*  @route: /api/appInfo
     *     - GET
     */
    AppInfo(req, res) {
        console.log('getting app info');
        res.setHeader('Content-Type', 'application/json');
        return this.apiHelper.fetchAppInfo()
                      .then(result => {
                            console.log(result);
                            return res.status(200).json(result);
                      }).catch(err => {
                            console.log(err);
                            return res.sendStatus(400);
                      });
    }
    /*  @route: /api/config-app
     *     - POST
     */
    ConfigApp(req, res) {
        console.log('ConfigApp app info');
        console.log(req.body);
        if(req.get('sfdc_pwd') == process.env.config_password) {
            console.log('is autheeddd');
            res.setHeader('Content-Type', 'application/json');
            return this.apiHelper.configApp(req.body)
                                 .then(result => {
                                     console.log(result);
                                     return res.status(200).json(result);
                                 }).catch(err => {
                                     console.log(err);
                                     return res.sendStatus(400);
                                 });
        } else {
            res.sendStatus(400);
        }
    }
    /*  @route: /api/upload-instructions
     *     - POST
     */
    UploadInstructions(request, respond) {
        console.log('UploadInstructions app info');
        console.log(request.body);
        var body = '';
        var filePath = 'somepdf.pdf';
        request.on('data', function(data) {
            body += data;
        });

        request.on('end', function (){
            console.log('file body raw');
            console.log(body);
            fs.appendFile(filePath, body, function() {
                respond.end();
            });
        });
        return respond.sendStatus(200);
    }
}

module.exports = ApiRoutes;
