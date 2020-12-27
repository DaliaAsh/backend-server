"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var categories_1 = __importDefault(require("./api/routes/categories"));
var products_1 = __importDefault(require("./api/routes/products"));
var checkouts_1 = __importDefault(require("./api/routes/checkouts"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
try {
    mongoose_1.default.connect("mongodb+srv://root:root@models.flbur.mongodb.net/Models?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
}
catch (err) {
    console.log(err);
}
mongoose_1.default.Promise = global.Promise;
//middleware 
app.use('/assets', express_1.default.static('assets'));
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//handle CORS origin errors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
//Routes 
app.use('/category', categories_1.default);
app.use('/product', products_1.default);
app.use('/checkout', checkouts_1.default);
app.use(function (req, res, next) {
    var error = new Error("Not Found");
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(500);
    res.json({
        error: {
            message: error.message
        }
    });
});
exports.default = app;
