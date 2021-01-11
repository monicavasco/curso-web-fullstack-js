"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = __importDefault(require("../controllers/accounts"));
const router = express_1.Router();
router.get('/', accounts_1.default.getAccounts);
router.post('/', accounts_1.default.addAccount);
exports.default = router;
