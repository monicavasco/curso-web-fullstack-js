"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const app = express_1.default();
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
app.use(accounts_1.default);
const port = parseInt(`${process.env.PORT}`);
app.listen(3000);
console.log(`Running on port ${port}`);
