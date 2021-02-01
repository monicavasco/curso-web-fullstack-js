"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateAccount = exports.validateSchema = void 0;
const accountSchemas_1 = require("../models/accountSchemas");
function validateSchema(schema, req, res, next) {
    const { error } = schema.validate(req.body);
    if (error == null)
        return next();
    const { details } = error;
    const message = details.map(item => item.message).join('.');
    console.log(message);
    res.status(422).end();
}
exports.validateSchema = validateSchema;
function validateAccount(req, res, next) {
    return validateSchema(accountSchemas_1.accountSchema, req, res, next);
}
exports.validateAccount = validateAccount;
function validateLogin(req, res, next) {
    return validateSchema(accountSchemas_1.loginSchema, req, res, next);
}
exports.validateLogin = validateLogin;
