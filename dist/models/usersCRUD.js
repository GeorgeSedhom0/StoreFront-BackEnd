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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCRUD = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// consts from the .env file
dotenv_1.default.config();
var _a = process.env, SALT_ROUNDS = _a.SALT_ROUNDS, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, TOKEN_SECRET = _a.TOKEN_SECRET;
var secret = "".concat(TOKEN_SECRET);
var salt = "".concat(BCRYPT_PASSWORD);
var saltRounds = parseInt("".concat(SALT_ROUNDS));
var usersCRUD = /** @class */ (function () {
    function usersCRUD() {
    }
    usersCRUD.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "SELECT first_name,last_name,id\n    FROM users";
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows;
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("can not get" + error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    usersCRUD.prototype.indexOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "SELECT first_name,last_name,id\n    FROM users WHERE id = ".concat(id, ";");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows[0];
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("can not get" + error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    usersCRUD.prototype.insert = function (firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, jwt, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, bcrypt_1.default.hash(password + salt, saltRounds)];
                    case 1:
                        password = _a.sent();
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        con = _a.sent();
                        sql = "INSERT INTO users \n        (first_name,last_name,password)\n        VALUES\n        ('".concat(firstname, "','").concat(lastname, "','").concat(password, "')\n        RETURNING first_name,last_name,id");
                        return [4 /*yield*/, con.query(sql)];
                    case 3:
                        res = (_a.sent()).rows[0];
                        con.release();
                        jwt = jsonwebtoken_1.default.sign(res, secret);
                        return [2 /*return*/, { jwt: jwt, id: res.id }];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error("can not insert" + error_3);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    usersCRUD.prototype.auth = function (firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, sqlPassword, DBPass, res, jwt, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "SELECT first_name,last_name,id FROM users\n      WHERE first_name = '".concat(firstname, "' AND\n      last_name = '").concat(lastname, "'");
                        sqlPassword = "SELECT password FROM users\n      WHERE first_name = '".concat(firstname, "' AND\n      last_name = '").concat(lastname, "'");
                        return [4 /*yield*/, con.query(sqlPassword)];
                    case 2:
                        DBPass = (_a.sent()).rows[0].password;
                        return [4 /*yield*/, con.query(sql)];
                    case 3:
                        res = (_a.sent()).rows[0];
                        con.release();
                        if (bcrypt_1.default.compareSync(password + salt, DBPass)) {
                            jwt = jsonwebtoken_1.default.sign(res, secret);
                            return [2 /*return*/, { jwt: jwt, id: res.id }];
                        }
                        else {
                            return [2 /*return*/, { jwt: "Wrong passwrd", id: res.id }];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error("can not insert" + error_4);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    usersCRUD.prototype.edit = function (id, firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, jwt, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, bcrypt_1.default.hash(password + salt, saltRounds)];
                    case 1:
                        password = _a.sent();
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        con = _a.sent();
                        sql = "UPDATE users \n        SET first_name = '".concat(firstname, "',\n        last_name = '").concat(lastname, "',\n        password = '").concat(password, "'\n        WHERE id = ").concat(id, "\n        RETURNING first_name,last_name,id");
                        return [4 /*yield*/, con.query(sql)];
                    case 3:
                        res = (_a.sent()).rows[0];
                        con.release();
                        jwt = jsonwebtoken_1.default.sign(res, secret);
                        return [2 /*return*/, { jwt: jwt, id: res.id }];
                    case 4:
                        error_5 = _a.sent();
                        throw new Error("can not edit" + error_5);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    usersCRUD.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "DELETE FROM users\n      WHERE id = ".concat(id, "\n      RETURNING first_name,last_name,id");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows[0];
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("can not delete" + error_6);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return usersCRUD;
}());
exports.usersCRUD = usersCRUD;
