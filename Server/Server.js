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

    let dataToSend = {
        "appURL": process.env.appURL,
        "appName": process.env.appName,
        "companyId": process.env.companyId,
        "companyName": process.env.companyName,
        "contactEmail": process.env.contactEmail
    };
    // Set the headers
    var headers = {
        'jzapi-token': 'change_this_later'
    }

    // Configure the request
    var options = {
        url: 'http://partner-site-template-reporter.herokuapp.com/jzapi/register-partner',
        method: 'POST',
        headers: headers,
        form: dataToSend
    }

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body

            console.log(body);
        } else {
            console.log(error);
            console.log(response);
        }
    });
}


//  run
app.listen(port, () => {
    RegisterApp();
    console.log( "Express server listening on port " + port);
});
