"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.engine("hbs", (0, express_handlebars_1.engine)({
    extname: ".hbs"
}));
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use("/", product_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map