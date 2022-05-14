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
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var shelljs_1 = __importDefault(require("shelljs"));
var usersCRUD_1 = require("../../models/usersCRUD");
var productsCRUD_1 = require("../../models/productsCRUD");
var request = (0, supertest_1.default)(index_1.default);
var db = new usersCRUD_1.usersCRUD();
var pdb = new productsCRUD_1.productsCRUD();
var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NTEwODYzNTF9.W_o4FkIvzirQUkgSkNWkRnUNU_rK1RgLVrdHZL5KPak";
var order = {
    userId: 1,
};
var product = {
    userId: 1,
    productId: 1,
    quantity: 20,
};
describe("Test orders End Point", function () {
    it("sould index all orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/orders").set("authorization", jwt)];
                case 1:
                    res = _a.sent();
                    expect(res.body).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("sould post an order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.insert("g", "s", "1")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post("/orders")
                            .send(order)
                            .set("authorization", jwt)];
                case 2:
                    res = _a.sent();
                    expect(res.body).toEqual({ user_id: 1, status: "true", id: 1 });
                    return [2 /*return*/];
            }
        });
    }); });
    it("sould edit a order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put("/orders/1/close").set("authorization", jwt)];
                case 1:
                    res = _a.sent();
                    expect(res.body).toEqual({
                        user_id: 1,
                        status: "false",
                        id: 1,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("sould insert products to an order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pdb.insert("prod", 20, 200)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post("/orders/1/products")
                            .send(product)
                            .set("authorization", jwt)];
                case 2:
                    res = _a.sent();
                    expect(res.body).toEqual({
                        order_id: 1,
                        product_id: 1,
                        quantity: 20,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("sould get products to an order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/orders/1/products")
                        .set("authorization", jwt)];
                case 1:
                    res = _a.sent();
                    expect(res.body).toEqual([
                        {
                            id: 1,
                            name: "prod",
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("sould delete to an order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .del("/orders/1/products/1")
                        .set("authorization", jwt)];
                case 1:
                    res = _a.sent();
                    expect(res.body).toEqual({
                        order_id: 1,
                        product_id: 1,
                        quantity: 20,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        shelljs_1.default.exec("db-migrate --env test reset && db-migrate --env test up");
    });
});
