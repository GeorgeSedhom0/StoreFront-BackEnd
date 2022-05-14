"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./routes/users"));
var products_1 = __importDefault(require("./routes/products"));
var cors_1 = __importDefault(require("cors"));
var orders_1 = __importDefault(require("./routes/orders"));
var JWTAuth_1 = __importDefault(require("./routes/JWTAuth"));
var app = (0, express_1.default)();
var corsOptions = {
    origin: "https://www.gmk2tech.com",
    optionsSuccessStatus: 200,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use("/users", users_1.default);
app.use("/products", products_1.default);
app.use("/orders", JWTAuth_1.default, orders_1.default);
app.listen(3000, function () {
    console.log("running");
});
exports.default = app;
