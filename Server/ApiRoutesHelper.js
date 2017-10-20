/*
 * @ApiRoutesHelper.js
 */
"use strict";

var fs = require('fs');
var appPageData = require('../site_data.json');


class ApiRoutesHelper {

    constructor() {
		// methods
        this.configApp = this.configApp.bind(this);
        this.fetchAppInfo = this.fetchAppInfo.bind(this);
    }

    configApp(reqBody) {
        return new Promise((resolve, reject) => {
            console.log(reqBody);
            var reqStr = JSON.stringify(reqBody);
            fs.writeFile('site_data.json', reqStr, 'utf8', function(resp) {
                console.log('file saved');
                resolve(appPageData);
            });
        });
    }

    fetchAppInfo() {
        console.log('fetchinnn');
        return new Promise((resolve, reject) => {
            var datFile = JSON.parse(fs.readFileSync('site_data.json', 'utf8'));
            console.log('reading flleee');
            console.log(datFile);
            resolve(datFile);
        });
    }
}

module.exports = ApiRoutesHelper;
