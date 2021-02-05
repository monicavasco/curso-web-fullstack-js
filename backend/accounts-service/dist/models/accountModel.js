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
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const accountModel = db_1.default.define('account', {
    id: {
        type: sequelize_1.default.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    },
    domain: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
function findAll() {
    return accountModel.findAll();
}
function findByEmail(emailFilter) {
    return accountModel.findOne({ where: { email: emailFilter } });
}
function findById(id) {
    return accountModel.findByPk(id);
}
function add(account) {
    return accountModel.create(account);
}
function set(id, account) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalAccount = yield accountModel.findByPk(id);
        if (originalAccount !== null) {
            originalAccount.name = account.name;
            originalAccount.domain = account.domain;
            originalAccount.status = account.status;
            if (!account.password)
                originalAccount.password = account.password;
            yield originalAccount.save();
            return originalAccount;
        }
        throw new Error(`Account not found.`);
    });
}
exports.default = { findAll, findById, add, set, findByEmail };
