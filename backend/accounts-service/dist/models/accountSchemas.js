"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountUpdateSchema = exports.loginSchema = exports.accountSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const accountSchema = joi_1.default.object({
    id: joi_1.default.number()
        .integer()
        .min(1),
    name: joi_1.default.string()
        .min(3)
        .max(150)
        .required(),
    email: joi_1.default.string()
        .email()
        .min(8)
        .max(150)
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(50)
        .required(),
    status: joi_1.default.number()
        .integer()
        .min(100)
        .max(400),
    domain: joi_1.default.string()
        .min(5)
        .max(150)
});
exports.accountSchema = accountSchema;
const accountUpdateSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(150),
    password: joi_1.default.string()
        .min(6)
        .max(50),
    status: joi_1.default.number()
        .integer()
        .min(100)
        .max(400),
    domain: joi_1.default.string()
        .min(5)
        .max(150)
});
exports.accountUpdateSchema = accountUpdateSchema;
const loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .min(8)
        .max(150)
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(50)
        .required()
});
exports.loginSchema = loginSchema;
