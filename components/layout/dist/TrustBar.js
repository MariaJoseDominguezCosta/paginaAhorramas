"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
function TrustBar() {
    return (React.createElement("section", { className: "bg-white border-t border-b border-[#E4E4E7] py-8" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "p-3 bg-red-50 text-[#CE2C3C] rounded-lg" },
                    React.createElement(lucide_react_1.Truck, { className: "w-5 h-5" })),
                React.createElement("div", null,
                    React.createElement("strong", { className: "text-xs md:text-sm block" }, "ENV\u00CDO A DOMICILIO"),
                    React.createElement("span", { className: "text-[11px] md:text-xs text-[#626264]" }, "A ciudades de Chiapas y Tabasco *"))),
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "p-3 bg-red-50 text-[#CE2C3C] rounded-lg" },
                    React.createElement(lucide_react_1.PhoneCall, { className: "w-5 h-5" })),
                React.createElement("div", null,
                    React.createElement("strong", { className: "text-xs md:text-sm block" }, "CONTACTANOS"),
                    React.createElement("span", { className: "text-[11px] md:text-xs text-[#626264]" }, "Soporte en l\u00EDnea directo"))),
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "p-3 bg-red-50 text-[#CE2C3C] rounded-lg" },
                    React.createElement(lucide_react_1.Percent, { className: "w-5 h-5" })),
                React.createElement("div", null,
                    React.createElement("strong", { className: "text-xs md:text-sm block" }, "DESCUENTOS"),
                    React.createElement("span", { className: "text-[11px] md:text-xs text-[#626264]" }, "En \u00F3rdenes mayores a $10,000 [5, 12]"))),
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "trust-icon bg-red-50 rounded-lg p-2.5 text-[#CE2C3C]" },
                    React.createElement(lucide_react_1.Medal, { className: "w-5 h-5" })),
                React.createElement("div", { className: "trust-text" },
                    React.createElement("strong", { className: "block text-sm font-semibold text-[#1A1A1A]" }, "GARANTIA"),
                    React.createElement("span", { className: "text-[11px] md:text-xs text-[#626264]" }, "6 meses por defecto de f\u00E1brica [12]"))))));
}
exports["default"] = TrustBar;
