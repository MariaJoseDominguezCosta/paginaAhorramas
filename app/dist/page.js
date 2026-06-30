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
var link_1 = require("next/link");
// Configuración de Strapi URL
var STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// Resuelve la URL completa de medios de Strapi (antepone http://localhost:1337)
function getStrapiMedia(url) {
    if (!url)
        return null;
    if (url.startsWith("http") || url.startsWith("//"))
        return url;
    return "" + STRAPI_URL + url;
}
function HomePage() {
    var _a = react_1.useState([]), products = _a[0], setProducts = _a[1];
    var _b = react_1.useState(""), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(false), mobileMenuOpen = _d[0], setMobileMenuOpen = _d[1]; // Control del menú lateral en móviles [4]
    // Carga de datos de Strapi en el cliente
    react_1.useEffect(function () {
        function loadProducts() {
            return __awaiter(this, void 0, void 0, function () {
                var res, json, mapped, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, 4, 5]);
                            return [4 /*yield*/, fetch(STRAPI_URL + "/api/muebles?populate=*")];
                        case 1:
                            res = _a.sent();
                            if (!res.ok)
                                throw new Error("HTTP Error: " + res.status);
                            return [4 /*yield*/, res.json()];
                        case 2:
                            json = _a.sent();
                            mapped = json.data.map(function (item) {
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
                            });
                            setProducts(mapped);
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            console.error("Error al conectar con Strapi, cargando locales...", error_1);
                            // Fallback local en caso de desconexión
                            setProducts([
                                { id: "1", nombre: "Sala Marruecos", categoria: "SALAS", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🛋️", imagenUrl: null },
                                { id: "2", nombre: "C.E. Milán", categoria: "MUEBLES TV", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "📺", imagenUrl: null },
                                { id: "3", nombre: "Recámara Porto", categoria: "RECÁMARAS", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🛏️", imagenUrl: null },
                                { id: "4", nombre: "Comedor Nataly", categoria: "COMEDORES", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🪑", imagenUrl: null }
                            ]);
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        loadProducts();
    }, []);
    // Manejar el cambio de texto del buscador
    var handleSearchChange = function (e) {
        setSearchQuery(e.target.value);
    };
    // Filtrado de productos en tiempo real por nombre o categoría
    var filteredProducts = products.filter(function (product) {
        var query = searchQuery.toLowerCase().trim();
        return (product.nombre.toLowerCase().includes(query) ||
            product.categoria.toLowerCase().includes(query));
    });
    return (react_1["default"].createElement("div", { className: "bg-[#FAFAFA] min-h-screen text-[#1A1A1A] font-sans antialiased" }, searchQuery.trim().length > 0 ? (
    /* VISTA DE RESULTADOS DE BÚSQUEDA EN TIEMPO REAL */
    react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-6 mt-12 mb-20 min-h-[400px]" },
        react_1["default"].createElement("div", { className: "mb-6" },
            react_1["default"].createElement("h3", { className: "text-2xl font-extrabold font-title flex items-center gap-1.5" },
                "Resultados de b\u00FAsqueda para: ",
                react_1["default"].createElement("span", { className: "text-[#CE2C3C]" },
                    "'",
                    searchQuery,
                    "'")),
            react_1["default"].createElement("p", { className: "text-sm text-[#626264] mt-0.5" },
                filteredProducts.length,
                " productos encontrados")),
        filteredProducts.length === 0 ? (react_1["default"].createElement("div", { className: "text-center py-16 text-zinc-500" }, "No se encontraron muebles que coincidan con tu b\u00FAsqueda.")) : (react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center" }, filteredProducts.map(function (item) { return (react_1["default"].createElement("div", { key: "search-" + item.id, className: "w-full max-w-[320px] bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]" },
            react_1["default"].createElement("div", { className: "bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden" },
                item.badge_oferta && (react_1["default"].createElement("span", { className: "absolute top-2 left-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full z-10" }, item.badge_oferta)),
                item.imagenUrl ? (react_1["default"].createElement("img", { src: item.imagenUrl, alt: item.nombre, className: "w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" })) : (react_1["default"].createElement("span", { className: "text-5xl opacity-80" }, item.foto_icono))),
            react_1["default"].createElement("div", { className: "p-4" },
                react_1["default"].createElement("span", { className: "text-[10px] font-bold text-[#626264] tracking-wider uppercase" }, item.categoria),
                react_1["default"].createElement("h4", { className: "font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2" }, item.nombre),
                react_1["default"].createElement(link_1["default"], { href: "/producto/" + item.id + "?categoria=" + encodeURIComponent(item.categoria), className: "block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition" }, "Ver producto")))); }))))) : (
    /* VISTA DE PORTADA ESTÁNDAR (Cuando el buscador está vacío) */
    react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-6 mt-6" },
            react_1["default"].createElement("div", { className: "bg-gradient-to-r from-[#FCE8EA] to-[#FCDCE1] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#E4E4E7] overflow-hidden relative" },
                react_1["default"].createElement("div", { className: "max-w-lg z-10" },
                    react_1["default"].createElement("span", { className: "bg-white/80 text-[#CE2C3C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider" }, "Especial de Temporada"),
                    react_1["default"].createElement("h2", { className: "text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mt-4 leading-tight font-title" },
                        "El Regalo Perfecto ",
                        react_1["default"].createElement("br", null),
                        "para ",
                        react_1["default"].createElement("span", { className: "text-[#CE2C3C]" }, "Mam\u00E1")),
                    react_1["default"].createElement("p", { className: "text-zinc-600 mt-4 text-sm md:text-base" }, "Aprovecha descuentos reales y flete gratis directo a domicilio en todo Chiapas y Tabasco.")),
                react_1["default"].createElement("div", { className: "flex flex-col items-center justify-center text-center bg-[#CE2C3C] text-white p-8 rounded-full w-64 h-64 border-4 border-white shadow-lg animate-pulse shrink-0" },
                    react_1["default"].createElement("span", { className: "text-xs uppercase tracking-widest font-bold opacity-90" }, "Toda la tienda"),
                    react_1["default"].createElement("span", { className: "text-5xl font-black mt-1" }, "40%"),
                    react_1["default"].createElement("span", { className: "text-xl font-bold" }, "+ 35%"),
                    react_1["default"].createElement("span", { className: "text-xs font-extrabold uppercase mt-1" }, "DESCUENTO + REGALO*")))),
        react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-6 mt-12" },
            react_1["default"].createElement("div", { className: "mb-6" },
                react_1["default"].createElement("h3", { className: "text-2xl font-extrabold font-title flex items-center gap-1.5" },
                    "Lo m\u00E1s ",
                    react_1["default"].createElement("span", { className: "text-[#CE2C3C]" }, "nuevo")),
                react_1["default"].createElement("p", { className: "text-sm text-[#626264] mt-0.5" }, "Lo reci\u00E9n agregado en esta temporada")),
            react_1["default"].createElement("div", { className: "flex gap-4 overflow-x-auto pb-2" }, products.map(function (item) { return (react_1["default"].createElement("div", { key: "nuevo-" + item.id, className: "w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] min-w-[240px] max-w-[320px] shrink-0 bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]" },
                react_1["default"].createElement("div", { className: "bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden" },
                    react_1["default"].createElement("span", { className: "absolute top-2 left-2 bg-[#FEF9C3] text-[#854D0E] text-[10px] font-bold px-2 py-0.5 rounded-full z-10" }, "Nuevo"),
                    item.imagenUrl ? (react_1["default"].createElement("img", { src: item.imagenUrl, alt: item.nombre, className: "w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" })) : (react_1["default"].createElement("span", { className: "text-5xl opacity-80" }, item.foto_icono))),
                react_1["default"].createElement("div", { className: "p-4" },
                    react_1["default"].createElement("span", { className: "text-[10px] font-bold text-[#626264] tracking-wider uppercase" }, item.categoria),
                    react_1["default"].createElement("h4", { className: "font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2" }, item.nombre),
                    react_1["default"].createElement(link_1["default"], { href: "/producto/" + item.id + "?categoria=" + encodeURIComponent(item.categoria), className: "block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition" }, "Ver producto")))); }))),
        react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-6 mt-12" },
            react_1["default"].createElement("div", { className: "mb-6" },
                react_1["default"].createElement("h3", { className: "text-2xl font-extrabold font-title" }, "Favoritos"),
                react_1["default"].createElement("p", { className: "text-sm text-[#626264] mt-0.5" }, "Los mejores calificados de los usuarios")),
            react_1["default"].createElement("div", { className: "flex gap-4 overflow-x-auto pb-2" }, products.map(function (item) { return (react_1["default"].createElement("div", { key: "fav-" + item.id, className: "w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] min-w-[240px] max-w-[320px] shrink-0 bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]" },
                react_1["default"].createElement("div", { className: "bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden" }, item.imagenUrl ? (react_1["default"].createElement("img", { src: item.imagenUrl, alt: item.nombre, className: "w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" })) : (react_1["default"].createElement("span", { className: "text-5xl opacity-80" }, item.foto_icono))),
                react_1["default"].createElement("div", { className: "p-4" },
                    react_1["default"].createElement("span", { className: "text-[10px] font-bold text-[#626264] tracking-wider uppercase" }, item.categoria),
                    react_1["default"].createElement("h4", { className: "font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2" }, item.nombre),
                    react_1["default"].createElement(link_1["default"], { href: "/producto/" + item.id + "?categoria=" + encodeURIComponent(item.categoria), className: "block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition" }, "Ver producto")))); }))),
        react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-6 mt-12" },
            react_1["default"].createElement("div", { className: "mb-6" },
                react_1["default"].createElement("h3", { className: "text-2xl font-extrabold font-title" },
                    "En ",
                    react_1["default"].createElement("span", { className: "text-[#CE2C3C]" }, "oferta"))),
            react_1["default"].createElement("div", { className: "flex gap-4 overflow-x-auto pb-2" }, products.map(function (item) { return (react_1["default"].createElement("div", { key: "oferta-" + item.id, className: "w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] min-w-[240px] max-w-[320px] shrink-0 bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]" },
                react_1["default"].createElement("div", { className: "bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden" },
                    react_1["default"].createElement("span", { className: "absolute top-2 left-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full z-10" }, item.badge_oferta || "Oferta 30%"),
                    react_1["default"].createElement("span", { className: "absolute bottom-2 right-2 bg-[#FDE8EA] text-[#A8202D] text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase z-10" }, item.tipo_oferta || "Hot Sale"),
                    item.imagenUrl ? (react_1["default"].createElement("img", { src: item.imagenUrl, alt: item.nombre, className: "w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" })) : (react_1["default"].createElement("span", { className: "text-5xl opacity-80" }, item.foto_icono))),
                react_1["default"].createElement("div", { className: "p-4" },
                    react_1["default"].createElement("span", { className: "text-[10px] font-bold text-[#626264] tracking-wider uppercase" }, item.categoria),
                    react_1["default"].createElement("h4", { className: "font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2" }, item.nombre),
                    react_1["default"].createElement(link_1["default"], { href: "/producto/" + item.id + "?categoria=" + encodeURIComponent(item.categoria), className: "block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition" }, "Ver producto")))); }))),
        react_1["default"].createElement("section", { className: "max-w-7xl mx-auto px-6 mt-12 mb-16" },
            react_1["default"].createElement("div", { className: "mb-6" },
                react_1["default"].createElement("h3", { className: "text-2xl font-extrabold font-title" },
                    "Productos ",
                    react_1["default"].createElement("span", { className: "text-[#CE2C3C]" }, "destacados")),
                react_1["default"].createElement("p", { className: "text-sm text-[#626264] mt-0.5" }, "Los m\u00E1s vendidos de esta temporada")),
            react_1["default"].createElement("div", { className: "flex gap-4 overflow-x-auto pb-2" }, products.map(function (item) { return (react_1["default"].createElement("div", { key: "destacado-" + item.id, className: "w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] min-w-[240px] max-w-[320px] shrink-0 bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]" },
                react_1["default"].createElement("div", { className: "bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden" },
                    react_1["default"].createElement("span", { className: "absolute top-2 left-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full z-10" }, item.badge_oferta || "Oferta 30%"),
                    react_1["default"].createElement("span", { className: "absolute bottom-2 right-2 bg-[#FDE8EA] text-[#A8202D] text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase z-10" }, item.tipo_oferta || "Hot Sale"),
                    item.imagenUrl ? (react_1["default"].createElement("img", { src: item.imagenUrl, alt: item.nombre, className: "w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" })) : (react_1["default"].createElement("span", { className: "text-5xl opacity-80" }, item.foto_icono))),
                react_1["default"].createElement("div", { className: "p-4" },
                    react_1["default"].createElement("span", { className: "text-[10px] font-bold text-[#626264] tracking-wider uppercase" }, item.categoria),
                    react_1["default"].createElement("h4", { className: "font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2" }, item.nombre),
                    react_1["default"].createElement(link_1["default"], { href: "/producto/" + item.id + "?categoria=" + encodeURIComponent(item.categoria), className: "block w-full bg-[#CE2C3C] text-[#FAFAFA] text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition" }, "Ver producto")))); })))))));
}
exports["default"] = HomePage;
