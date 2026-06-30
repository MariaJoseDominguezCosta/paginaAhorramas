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
var api_1 = require("@/lib/api");
var SearchRealtimeClient_1 = require("@/app/buscar/SearchRealtimeClient");
var STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
function mapProduct(item) {
    var _a, _b, _c, _d;
    var attrs = item.attributes || item;
    // Parser dual robusto para Strapi v4 y v5 [2]
    var catData = ((_b = (_a = attrs.categoria) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) || attrs.categoria || {};
    var categoriaNombre = catData.nombre || "Muebles";
    var categoriaIcono = catData.icono || "🛋️";
    var fotoData = ((_c = attrs.imagen_producto) === null || _c === void 0 ? void 0 : _c.data) || attrs.imagen_producto || null;
    var fotoUrl = null;
    if (Array.isArray(fotoData) && fotoData.length > 0) {
        var primeraFoto = fotoData[0];
        var fotoAttrs = primeraFoto.attributes || primeraFoto;
        fotoUrl = fotoAttrs.url || null;
    }
    return {
        id: item.documentId || String(item.id),
        nombre: (_d = attrs.nombre) !== null && _d !== void 0 ? _d : "Producto sin nombre",
        categoria: categoriaNombre.toUpperCase(),
        badge_oferta: attrs.badge_oferta,
        tipo_oferta: attrs.tipo_oferta,
        foto_icono: categoriaIcono,
        imagenUrl: getStrapiMedia(fotoUrl)
    };
}
// Resuelve la URL completa de medios de Strapi (antepone http://localhost:1337)
function getStrapiMedia(url) {
    if (!url)
        return null;
    if (url.startsWith("http") || url.startsWith("//"))
        return url;
    return "" + STRAPI_URL + url;
}
function SearchPage(_a) {
    var searchParams = _a.searchParams;
    return __awaiter(this, void 0, void 0, function () {
        var q, response, products;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, searchParams];
                case 1:
                    q = (_b.sent()).q;
                    return [4 /*yield*/, api_1.fetchAPI("muebles", "populate=*")];
                case 2:
                    response = _b.sent();
                    products = response.data.map(mapProduct);
                    return [2 /*return*/, React.createElement(SearchRealtimeClient_1["default"], { key: q || "", products: products, initialQuery: q || "" })];
            }
        });
    });
}
exports["default"] = SearchPage;
