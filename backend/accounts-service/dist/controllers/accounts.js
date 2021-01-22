"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accounts = [];
function getAccounts(req, res, next) {
    res.json(accounts);
}
function getAccount(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const index = accounts.findIndex(item => item.id === id);
        if (index === -1)
            return res.status(404).end();
        else
            res.json(accounts[index]);
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
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
exports.default = { getAccounts, getAccount, addAccount };
