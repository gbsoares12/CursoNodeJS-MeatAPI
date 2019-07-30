import * as restify from 'restify';

export abstract class Router {
    abstract applyRoutes(application: restify.Server);

   /* this.application.get('/info', [(req, resp, next) => {
        if (req.userAgent && req.userAgent().includes('MSIE 7.0')) {
            let error: any = new Error();
            error.statusCode = 400;
            error.message = 'Please update your browser!';
            return next(error);
        }
        return next();
    }, (req, resp, next) => {
        // resp.setHeader('Content-Type','application/json');
        resp.json({
            browser: req.userAgent(),
            method: req.method,
            url: req.href(),
            path: req.path(),
            query: req.query
        });
        return next();
    }]);*/

}