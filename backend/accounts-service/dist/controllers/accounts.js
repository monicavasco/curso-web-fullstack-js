"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accounts = [];
function getAccounts(req, res, next) {
    res.json(accounts);
}
function addAccount(req, res, next) {
    try {
        const newAccount = req.body;
        accounts.push(newAccount);
        res.status(201).json(newAccount);
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}
exports.default = { getAccounts, addAccount };
