"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        req.rawBody = req.body; //Fazendo o parse para any, precisa colocar entre ().
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new Error(`Invalid content: ${e.message}`));
        }
    }
    return next();
};
