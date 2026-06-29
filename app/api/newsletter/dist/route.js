"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
exports.POST = void 0;
var server_1 = require("next/server");
var STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
var STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function POST(request) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var body, email, findResponse, found, createResponse, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    body = _c.sent();
                    email = String(body.email || "")
                        .trim()
                        .toLowerCase();
                    if (!isValidEmail(email)) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "Correo electrónico inválido." }, { status: 400 })];
                    }
                    return [4 /*yield*/, fetch(STRAPI_URL + "/api/suscriptores?filters[email][$eq]=" + encodeURIComponent(email), {
                            headers: STRAPI_API_TOKEN
                                ? { Authorization: "Bearer " + STRAPI_API_TOKEN }
                                : {},
                            cache: "no-store"
                        })];
                case 2:
                    findResponse = _c.sent();
                    if (!findResponse.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, findResponse.json()];
                case 3:
                    found = _c.sent();
                    if (((_a = found.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "Este correo ya está suscrito." }, { status: 409 })];
                    }
                    _c.label = 4;
                case 4: return [4 /*yield*/, fetch(STRAPI_URL + "/api/suscriptores", {
                        method: "POST",
                        headers: __assign({ "Content-Type": "application/json" }, (STRAPI_API_TOKEN
                            ? { Authorization: "Bearer " + STRAPI_API_TOKEN }
                            : {})),
                        body: JSON.stringify({
                            data: {
                                email: email
                            }
                        })
                    })];
                case 5:
                    createResponse = _c.sent();
                    if (!createResponse.ok) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "No se pudo guardar la suscripción." }, { status: 500 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: "Suscripción guardada correctamente."
                        })];
                case 6:
                    _b = _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Ocurrió un error inesperado." }, { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
