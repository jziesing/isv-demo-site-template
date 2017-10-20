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
	clientRouter = require('./ClientRouter.js');



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


//  run
app.listen(port, () => console.log( "Express server listening on port " + port) );
