"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
exports.default = db_1.default.define('account', {
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