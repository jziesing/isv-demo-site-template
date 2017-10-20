/*
 * @ApiRouter.js
 */
"use strict";


let express = require('express'),
    ApiRoutes = require('./ApiRoutes.js'),
    ApiRouter = express.Router(),
    Api = new ApiRoutes();
/*
 *  public routes
 */
ApiRouter.get("/api/app-info/", Api.AppInfo);
/*
 *  private routes
 */
ApiRouter.post("/api/config-app/", Api.ConfigApp);
ApiRouter.post("/api/login/", Api.Login);
ApiRouter.post("/api/upload-instructions/", Api.UploadInstructions);


/*
 * export
 */
module.exports = ApiRouter;
