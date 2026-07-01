"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var TopPromoBar_1 = require("@/components/layout/TopPromoBar");
var Navbar_1 = require("@/components/layout/Navbar");
var TrustBar_1 = require("@/components/layout/TrustBar");
var Newsletter_1 = require("@/components/layout/Newsletter");
var Footer_1 = require("@/components/layout/Footer");
var LocationProvider_1 = require("@/components/providers/LocationProvider");
require("../styles/tailwind.css");
require("../styles/index.css");
exports.metadata = {
    title: {
        "default": 'Mueblerias Ahorramas - Modern Furniture Store',
        template: 'Mueblerias Ahorramas - Modern Furniture Store | %s'
    },
    description: 'Discover premium furniture for every room in your home at Mueblerias Ahorramas. Shop living rooms, bedrooms, dining rooms, and TV furniture with exclusive discounts up to 40% off. Free shipping on select items and factory-direct pricing with quality guarantee.',
    keywords: 'furniture store, modern furniture, living room furniture, bedroom furniture, dining room furniture, salas, recámaras, comedores, home decor, furniture sale, discount furniture, quality furniture',
    openGraph: {
        type: 'website',
        title: {
            "default": 'Mueblerias Ahorramas - Modern Furniture Store',
            template: 'Mueblerias Ahorramas - Modern Furniture Store | %s'
        },
        description: 'Shop premium furniture with up to 40% off store-wide! Quality living room, bedroom, and dining furniture with factory-direct pricing, free shipping, and satisfaction guarantee. Transform your home today!'
    }
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", className: "h-full antialiased" },
        React.createElement("body", { className: "min-h-full flex flex-col" },
            React.createElement(LocationProvider_1.LocationProvider, null,
                React.createElement(TopPromoBar_1["default"], null),
                React.createElement(Navbar_1["default"], null),
                children,
                React.createElement(TrustBar_1["default"], null),
                React.createElement(Newsletter_1["default"], null),
                React.createElement(Footer_1["default"], null)))));
}
exports["default"] = RootLayout;
