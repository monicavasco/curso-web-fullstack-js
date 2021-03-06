"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = exports.validateUpdateAccount = exports.validateLogin = exports.validateAccount = exports.validateSchema = void 0;
const auth_1 = __importDefault(require("../auth"));
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
function validateUpdateAccount(req, res, next) {
    return validateSchema(accountSchemas_1.accountUpdateSchema, req, res, next);
}
exports.validateUpdateAccount = validateUpdateAccount;
function validateLogin(req, res, next) {
    return validateSchema(accountSchemas_1.loginSchema, req, res, next);
}
exports.validateLogin = validateLogin;
function validateAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers['x-access-token'];
            if (!token)
                return res.status(401).end();
            const payload = yield auth_1.default.verify(token);
            if (!payload)
                return res.status(401).end();
            res.locals.payload = payload;
            next();
        }
        catch (error) {
            console.log(`validateAuth: ${error}`);
            res.status(400).end();
        }
    });
}
exports.validateAuth = validateAuth;
