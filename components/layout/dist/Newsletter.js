"use client";
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
exports.__esModule = true;
var react_1 = require("react");
function Newsletter() {
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState("idle"), status = _b[0], setStatus = _b[1];
    var _c = react_1.useState(""), message = _c[0], setMessage = _c[1];
    function handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function () {
            var cleanEmail, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        cleanEmail = email.trim().toLowerCase();
                        if (!cleanEmail) {
                            setStatus("error");
                            setMessage("Escribe tu correo electrónico.");
                            return [2 /*return*/];
                        }
                        setStatus("loading");
                        setMessage("");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("/api/newsletter", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ email: cleanEmail })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        if (!response.ok) {
                            throw new Error(data.message || "No se pudo guardar tu correo.");
                        }
                        setStatus("success");
                        setMessage("Listo, te avisaremos cuando haya nuevas ofertas.");
                        setEmail("");
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        setStatus("error");
                        setMessage(error_1 instanceof Error
                            ? error_1.message
                            : "Ocurrió un error al suscribirte.");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("section", { className: "bg-[#F4F4F5] py-12 border-b border-[#E4E4E7]" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-6 flex flex-row items-center justify-between gap-6" },
            React.createElement("div", null,
                React.createElement("h2", { className: "text-2xl font-extrabold text-[#1A1A1A]" }, "Recibe nuestras ofertas"),
                React.createElement("p", { className: "mt-2 text-sm font-medium text-[#626264]" }, "Suscr\u00EDbete y s\u00E9 el primero en enterarte de descuentos y nuevos modelos.")),
            React.createElement("form", { onSubmit: handleSubmit, className: "space-y-2 " },
                React.createElement("div", { className: "flex w-full md:w-auto max-w-md gap-2" },
                    React.createElement("input", { type: "email", value: email, onChange: function (event) { return setEmail(event.target.value); }, placeholder: "tu@correo.com", className: "bg-[#FAFAFA] border border-[#E4E4E7] rounded-md px-4 py-2 text-sm text-[#1A1A1A] flex-1 outline-none focus:border-[#CE2C3C]", disabled: status === "loading" }),
                    React.createElement("button", { type: "submit", disabled: status === "loading", className: "h-12 rounded-lg bg-[#CE2C3C] px-6 text-sm font-bold text-[#FAFAFA] transition hover:bg-[#A8202D] disabled:cursor-not-allowed disabled:opacity-70" }, status === "loading" ? "Enviando..." : "Suscribirme")),
                message && (React.createElement("p", { className: "text-sm font-medium " + (status === "success" ? "text-green-600" : "text-[#CE2C3C]") }, message))))));
}
exports["default"] = Newsletter;
