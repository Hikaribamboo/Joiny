"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const greetings = [
    { id: 0, greeting: 'Hello!' },
    { id: 1, greeting: 'Nice to meet you' },
];
router.get('/', (req, res) => {
    greetings.push(req.body);
    res.send(greetings);
});
exports.default = router;
