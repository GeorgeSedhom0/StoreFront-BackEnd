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
exports.ordersCRUD = void 0;
var database_1 = __importDefault(require("../database"));
var ordersCRUD = /** @class */ (function () {
    function ordersCRUD() {
    }
    ordersCRUD.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "SELECT * FROM orders;";
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows;
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("can not get " + error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ordersCRUD.prototype.indexOne = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "SELECT * FROM orders\n      WHERE user_id = ".concat(userId, ";");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows;
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("can not get " + error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ordersCRUD.prototype.insert = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "INSERT INTO orders \n        (status,user_id)\n        VALUES\n        (true,".concat(userId, ")\n        RETURNING *");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows[0];
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("can not insert " + error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ordersCRUD.prototype.edit = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "UPDATE orders \n        SET status = '".concat(status, "'\n        WHERE id = ").concat(id, "\n        RETURNING *");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows[0];
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("can not edit " + error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ordersCRUD.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "DELETE FROM orders\n      WHERE id = ".concat(id, "\n      RETURNING *");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows[0];
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("can not delete" + error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ordersCRUD.prototype.productsOrder = function (orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "INSERT INTO orders_products \n        (quantity,order_id,product_id)\n        VALUES\n        (".concat(quantity, ",").concat(orderId, ",").concat(productId, ")\n        RETURNING *");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows[0];
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("can not insert" + error_6);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ordersCRUD.prototype.productsOrderIndex = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "SELECT products.name, products.id FROM orders_products \n      INNER JOIN products ON products.id = product_id \n      INNER JOIN orders ON orders.id = order_id\n      WHERE orders.id = ".concat(orderId, ";");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows;
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_7 = _a.sent();
                        throw new Error("can not insert" + error_7);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ordersCRUD.prototype.productsOrderDel = function (orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var con, sql, res, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        con = _a.sent();
                        sql = "DELETE FROM orders_products \n        WHERE order_id = ".concat(orderId, " AND product_id = ").concat(productId, "\n        RETURNING *;");
                        return [4 /*yield*/, con.query(sql)];
                    case 2:
                        res = (_a.sent()).rows[0];
                        con.release();
                        return [2 /*return*/, res];
                    case 3:
                        error_8 = _a.sent();
                        throw new Error("can not insert" + error_8);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ordersCRUD;
}());
exports.ordersCRUD = ordersCRUD;
