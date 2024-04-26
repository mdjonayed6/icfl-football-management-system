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
exports.departmentController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
// Getting all departments
const getDept = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield queryCollection_1.Query.selectOne('departments', 'id', 1);
        (0, sendApiResponse_1.default)(res, 200, true, 'Department fetched successfully', result);
    }
    catch (error) {
        next(error);
    }
});
exports.departmentController = {
    getDept
};
