/*
 * @Server.js
 */
"use strict";


require('babel-register')({
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['react-html-attrs', 'add-module-exports']
});

let express = require('express'),
	bodyParser = require('body-parser'),
	apiRouter = require('./ApiRouter.js'),
	clientRouter = require('./ClientRouter.js'),
    request = require('request');

let ajax = require('superagent');

//  create server app
let app = express();
let port = process.env.PORT || 3000;

// parsing
// app.use(bodyParser.text());
app.use(bodyParser.json());

// api
app.use(apiRouter);

// web client --> looks at cname
app.use(express.static(__dirname + '/../Client/build/'));
app.use(clientRouter);


// register app function
function RegisterApp() {
    console.log('::registering app::');
    console.log('app name - ' + process.env.HEROKU_APP_NAME + ' : parent app name - ' + process.env.HEROKU_PARENT_APP_NAME);
    let urlss = 'http://partner-site-template-reporter.herokuapp.com/jzapi/register-partner';
    ajax.post(urlss)
        .set({'jzapi-token': 'change_this_later'})
        .send({
            "appName": process.env.HEROKU_APP_NAME,
            "appURL": 'http://' + process.env.HEROKU_APP_NAME + '.herokuapp.com',
            "companyName": process.env.companyName,
            "contactName": process.env.contactName,
            "contactEmail": process.env.contactEmail
        }).end((error, response) => {
            console.log(response);
            if(!error && response.status == 200) {
                console.log('success : app registered');
            } else {
                console.log('error');
            }
        });
}


//  run
app.listen(port, () => {
    RegisterApp();
    console.log( "Express server listening on port " + port);
});
