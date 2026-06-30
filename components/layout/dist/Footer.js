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
exports.__esModule = true;
var link_1 = require("next/link");
// Icono personalizado de Facebook (SVG directo de marca)
var FacebookIcon = function (props) { return (React.createElement("svg", __assign({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, props),
    React.createElement("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }))); };
// Icono personalizado de Instagram (SVG directo de marca)
var InstagramIcon = function (props) { return (React.createElement("svg", __assign({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, props),
    React.createElement("rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }),
    React.createElement("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
    React.createElement("line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" }))); };
// Icono personalizado de WhatsApp (SVG directo de marca)
var WhatsAppIcon = function (props) { return (React.createElement("svg", __assign({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, props),
    React.createElement("path", { d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" }))); };
function Footer() {
    return (React.createElement(React.Fragment, null,
        React.createElement("footer", { className: "bg-[#18181B] text-zinc-400 py-12 text-[13px] border-b border-zinc-800" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8" },
                React.createElement("div", null,
                    React.createElement("div", { className: "font-extrabold text-lg text-white mb-4" },
                        React.createElement("img", { src: "/images/logo.png", alt: "Muebler\u00EDas Ahorram\u00E1s", className: "h-12 w-auto object-contain" })),
                    React.createElement("p", { className: "line-clamp-4 leading-relaxed mb-6" }, "La cadena de muebler\u00EDas n\u00FAmero 1 en Chiapas y Tabasco. Calidad y elegancia a precios inigualables desde 2003."),
                    React.createElement("div", { className: "flex gap-2" },
                        React.createElement("span", { className: "w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-[#CE2C3C] hover:text-white cursor-pointer transition" },
                            React.createElement(FacebookIcon, { className: "w-4 h-4" })),
                        React.createElement("span", { className: "w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-[#CE2C3C] hover:text-white cursor-pointer transition" },
                            React.createElement(InstagramIcon, { className: "w-4 h-4" })),
                        React.createElement("span", { className: "w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-[#CE2C3C] hover:text-white cursor-pointer transition" },
                            React.createElement(WhatsAppIcon, { className: "w-4 h-4" })))),
                React.createElement("div", null,
                    React.createElement("h5", { className: "font-bold text-white mb-4" }, "Categor\u00EDas"),
                    React.createElement("ul", { className: "space-y-2" },
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/salas", className: "hover:text-white" }, "Salas")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/recamaras", className: "hover:text-white" }, "Rec\u00E1maras")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/comedores", className: "hover:text-white" }, "Comedores")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/tv", className: "hover:text-white" }, "Muebles TV")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/colchones", className: "hover:text-white" }, "Colchones")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/otrosMuebles", className: "hover:text-white" }, "Otros muebles")))),
                React.createElement("div", null,
                    React.createElement("h5", { className: "font-bold text-white mb-4" }, "Empresa"),
                    React.createElement("ul", { className: "space-y-2" },
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/nosotros", className: "hover:text-white" }, "Sobre nosotros")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/sucursales", className: "hover:text-white" }, "Sucursales")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/privacidad", className: "hover:text-white" }, "Pol\u00EDtica de privacidad")))),
                React.createElement("div", null,
                    React.createElement("h5", { className: "font-bold text-white mb-4" }, "Contacto"),
                    React.createElement("p", { className: "mb-2" }, "\uD83D\uDCDE 9632684589"),
                    React.createElement("p", { className: "mb-2" }, "\uD83D\uDCCD Las Margaritas, Chiapas, M\u00E9xico"),
                    React.createElement("p", null, "\u2709\uFE0F info@muebleriasahorramas.com.mx")))),
        React.createElement("div", { className: "bg-[#0F0F10] text-[11px] text-zinc-600 py-4 text-left px-6" }, "Copyright \u00A9 2003 Muebler\u00EDas Ahorra Mas. Todos los derechos reservados.")));
}
exports["default"] = Footer;
