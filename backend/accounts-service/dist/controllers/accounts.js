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
const accountModel_1 = __importDefault(require("../models/accountModel"));
const auth_1 = __importDefault(require("../auth"));
const accounts = [];
function getAccounts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const accounts = yield accountModel_1.default.findAll();
        res.json(accounts.map(item => {
            item.password = '';
            return item;
        }));
    });
}
function getAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                throw new Error("ID is invalid format.");
            const account = yield accountModel_1.default.findById(id);
            if (account === null)
                return res.status(404).end();
            else {
                account.password = '';
                res.json(account);
            }
        }
        catch (error) {
            console.log(`getAccount: ${error}`);
            res.status(400).end();
        }
    });
}
function addAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newAccount = req.body;
            newAccount.password = auth_1.default.hashPassword(newAccount.password);
            const result = yield accountModel_1.default.add(newAccount);
            newAccount.password = '';
            newAccount.id = result.id;
            res.status(201).json(newAccount);
        }
        catch (error) {
            console.log(`addAccount: ${error}`);
            res.status(400).end();
        }
    });
}
function setAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accountId = parseInt(req.params.id);
            if (!accountId)
                throw new Error('ID is in invalid format.');
            const accountParams = req.body;
            accountParams.password = auth_1.default.hashPassword(accountParams.password);
            const updatedAccount = yield accountModel_1.default.set(accountId, accountParams);
            updatedAccount.password = '';
            res.status(200).json(updatedAccount);
        }
        catch (error) {
            console.log(`setAccount: ${error}`);
            res.status(400).end();
        }
    });
}
function loginAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginParams = req.body;
            const account = yield accountModel_1.default.findByEmail(loginParams.email);
            if (account !== null) {
                const isValid = auth_1.default.comparePassword(loginParams.password, account.password);
                if (isValid) {
                    const token = yield auth_1.default.sign(account.id);
                    return res.json({ auth: true, token });
                }
            }
            return res.status(401).end();
        }
        catch (error) {
            console.log(`loginAccount: ${error}`);
            res.status(400).end();
        }
    });
}
function logoutAccount(req, res, next) {
    res.json({ auth: false, token: null });
}
exports.default = { getAccounts, getAccount, addAccount, setAccount, loginAccount, logoutAccount };
