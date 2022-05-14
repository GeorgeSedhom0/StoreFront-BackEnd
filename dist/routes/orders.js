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
Object.defineProperty(exports, "__esModule", { value: true });
var ordersCRUD_1 = require("../models/ordersCRUD");
var express_1 = require("express");
var validateOrders_1 = require("../utils/validateOrders");
var ordersRoutes = (0, express_1.Router)();
var db = new ordersCRUD_1.ordersCRUD();
ordersRoutes.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400);
                res.json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
ordersRoutes.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, db.indexOne(id)];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400);
                res.json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
ordersRoutes.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, order, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, validateOrders_1.validateOrder)(req)];
            case 1:
                userId = _a.sent();
                return [4 /*yield*/, db.insert(userId)];
            case 2:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(400);
                res.json(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
ordersRoutes.put("/:id/close", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, db.edit(id, false)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400);
                res.json(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
ordersRoutes.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, db.delete(id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(400);
                res.json(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
ordersRoutes.post("/:id/products", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var quantity, orderId, productId, orderProducts, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                quantity = parseInt(req.body.quantity);
                orderId = parseInt(req.params.id);
                productId = parseInt(req.body.productId);
                return [4 /*yield*/, db.productsOrder(orderId, productId, quantity)];
            case 1:
                orderProducts = _a.sent();
                res.json(orderProducts);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(400);
                res.json(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
ordersRoutes.get("/:id/products", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, orderProducts, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(req.params.id);
                return [4 /*yield*/, db.productsOrderIndex(orderId)];
            case 1:
                orderProducts = _a.sent();
                res.json(orderProducts);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(400);
                res.json(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
ordersRoutes.delete("/:orderId/products/:productId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, orderProducts, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(req.params.orderId);
                productId = parseInt(req.params.productId);
                return [4 /*yield*/, db.productsOrderDel(orderId, productId)];
            case 1:
                orderProducts = _a.sent();
                res.json(orderProducts);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(400);
                res.json(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = ordersRoutes;
