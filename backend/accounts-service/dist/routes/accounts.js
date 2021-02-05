"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = __importDefault(require("../controllers/accounts"));
const middlewares_1 = require("./middlewares");
const router = express_1.Router();
router.get('/accounts/', middlewares_1.validateAuth, accounts_1.default.getAccounts);
router.get('/accounts/:id', middlewares_1.validateAuth, accounts_1.default.getAccount);
router.patch('/accounts/:id', middlewares_1.validateAuth, middlewares_1.validateUpdateAccount, accounts_1.default.setAccount);
router.post('/accounts/', middlewares_1.validateAccount, accounts_1.default.addAccount);
router.post('/accounts/login', middlewares_1.validateLogin, accounts_1.default.loginAccount);
router.post('/accounts/logout', middlewares_1.validateAuth, accounts_1.default.logoutAccount);
exports.default = router;
