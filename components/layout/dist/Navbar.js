"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var categoryNavigation_1 = require("@/lib/categoryNavigation");
function Navbar() {
    var router = navigation_1.useRouter();
    var pathname = navigation_1.usePathname();
    var searchParams = navigation_1.useSearchParams();
    var searchQueryInUrl = searchParams.get("q") || "";
    var _a = react_1.useState(searchQueryInUrl), query = _a[0], setQuery = _a[1];
    var _b = react_1.useState(false), isNavbarSearching = _b[0], setIsNavbarSearching = _b[1];
    var _c = react_1.useState(false), mobileMenuOpen = _c[0], setMobileMenuOpen = _c[1];
    var queryCategory = searchParams.get("categoria") || searchParams.get("cat");
    var activeCategory = categoryNavigation_1.normalizeCategoryToNavKey(queryCategory) || categoryNavigation_1.categoryFromPathname(pathname);
    function getLinkClass(href, key) {
        if (key && activeCategory === key) {
            return categoryNavigation_1.CATEGORY_COLOR_CLASSES[key].active + " transition";
        }
        if (href === "/" && pathname === "/" && !activeCategory) {
            return "text-[#CE2C3C] hover:text-[#CE2C3C] transition";
        }
        if (key) {
            return "text-[#626264] " + categoryNavigation_1.CATEGORY_COLOR_CLASSES[key].hover + " transition";
        }
        return "text-[#626264] hover:text-[#CE2C3C] transition";
    }
    function handleSearch(event) {
        event.preventDefault();
        var cleanQuery = (isNavbarSearching ? query : searchQueryInUrl).trim();
        if (cleanQuery)
            router.push("/buscar?q=" + encodeURIComponent(cleanQuery));
    }
    react_1.useEffect(function () {
        if (!isNavbarSearching)
            return;
        var handler = setTimeout(function () {
            var cleanQuery = query.trim();
            if (!cleanQuery) {
                if (pathname === "/buscar" && searchQueryInUrl) {
                    router.replace("/buscar", { scroll: false });
                }
                return;
            }
            if (pathname === "/buscar" && searchQueryInUrl === cleanQuery) {
                return;
            }
            router.replace("/buscar?q=" + encodeURIComponent(cleanQuery), { scroll: false });
        }, 280);
        return function () { return clearTimeout(handler); };
    }, [isNavbarSearching, pathname, query, router, searchQueryInUrl]);
    function handleNavbarQueryChange(value) {
        setIsNavbarSearching(true);
        setQuery(value);
    }
    function stopNavbarSearchSync() {
        setIsNavbarSearching(false);
        setQuery(searchQueryInUrl);
    }
    return (React.createElement("nav", { className: "bg-[#F4F4F5] border-b border-[#E4E4E7] sticky top-0 z-50" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col gap-3" },
            React.createElement("div", { className: "flex items-center justify-between gap-4" },
                React.createElement("button", { onClick: function () { return setMobileMenuOpen(!mobileMenuOpen); }, className: "p-1 text-[#626264] hover:text-[#CE2C3C] transition md:hidden focus:outline-none", "aria-label": "Abrir men\u00FA" }, mobileMenuOpen ? React.createElement(lucide_react_1.X, { className: "w-6 h-6" }) : React.createElement(lucide_react_1.Menu, { className: "w-6 h-6" })),
                React.createElement("div", { className: "items-center sm:hidden md:flex flex-col gap-2 w-auto object-contain " },
                    React.createElement(link_1["default"], { href: "/" },
                        React.createElement("img", { src: "/images/logo.png", alt: "Muebler\u00EDas Ahorram\u00E1s", className: "md:h-12 w-auto object-contain" })),
                    React.createElement("div", { className: "flex items-center gap-1.5 text-xs text-[#626264] cursor-pointer hover:text-[#CE2C3C] transition" },
                        React.createElement(lucide_react_1.MapPin, { className: "w-4 h-4 text-zinc-800" }),
                        React.createElement("span", null,
                            "Enviar a: ",
                            React.createElement("strong", { className: "underline text-[#CE2C3C]" }, "Seleccionar C.P.")))),
                React.createElement("div", { className: "flex-col gap-2 w-auto justify-items-center" },
                    React.createElement("form", { onSubmit: handleSearch, className: "hidden md:flex max-w-lg relative items-center w-full" },
                        React.createElement("input", { type: "text", value: isNavbarSearching ? query : searchQueryInUrl, onFocus: function () { return setIsNavbarSearching(true); }, onBlur: stopNavbarSearchSync, onChange: function (event) { return handleNavbarQueryChange(event.target.value); }, placeholder: "Busca salas, rec\u00E1maras, comedores, colchones ...", className: "w-full bg-[#FAFAFA] border border-zinc-300 rounded-full py-2.5 px-5 pr-12 text-sm text-[#1A1A1A] placeholder-zinc-500 outline-none focus:border-[#CE2C3C] focus:bg-white transition shadow-inner" }),
                        React.createElement(lucide_react_1.Search, { className: "w-5 h-5 text-zinc-600 absolute right-4 cursor-pointer" })),
                    React.createElement("div", { className: "hidden md:flex items-center pt-2 gap-4 lg:gap-5 text-[13px] font-semibold text-[#626264] overflow-x-auto text-center" }, categoryNavigation_1.CATEGORY_NAV_ITEMS.map(function (item) { return (React.createElement(link_1["default"], { key: item.label, href: item.href, className: getLinkClass(item.href, item.key) }, item.label)); }))),
                React.createElement("div", { className: "hidden lg:flex-row md:flex flex-col  items-center gap-3" },
                    React.createElement("div", { className: "sm:hidden md:flex items-center gap-3" },
                        React.createElement("button", { className: "flex lg:flex-row sm:flex-col items-center gap-1 sm:text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition" },
                            React.createElement(lucide_react_1.ShoppingCart, { className: "w-4 h-4  text-zinc-800" }),
                            React.createElement("span", { className: "text-[10px] sm:text-xs" }, "Carrito")),
                        React.createElement("button", { className: "flex lg:flex-row sm:flex-col items-center gap-1 sm:text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition" },
                            React.createElement(lucide_react_1.User, { className: "w-4 h-4 text-zinc-800" }),
                            React.createElement("span", { className: "text-[10px] sm:text-xs" }, "Cuenta"))),
                    React.createElement("button", { className: "sm:hidden md:flex bg-[#CE2C3C] text-white px-3 py-1.5 rounded-full text-sm font-bold hover:bg-[#A8202D] transition shadow-sm" }, "Cont\u00E1ctanos")),
                React.createElement("div", { className: "flex gap-2 w-full justify-items-center md:hidden " },
                    React.createElement("form", { onSubmit: handleSearch, className: "max-w-lg relative items-center w-full flex" },
                        React.createElement("input", { type: "text", value: isNavbarSearching ? query : searchQueryInUrl, onFocus: function () { return setIsNavbarSearching(true); }, onBlur: stopNavbarSearchSync, onChange: function (event) { return handleNavbarQueryChange(event.target.value); }, placeholder: "Busca salas, rec\u00E1maras, comedores...", className: "w-full bg-white border border-zinc-300 rounded-full py-2 px-4 pr-10 text-sm outline-none focus:border-[#CE2C3C] transition shadow-sm" }),
                        React.createElement(lucide_react_1.Search, { className: "w-4 h-4 text-[#626264] absolute right-3" })),
                    React.createElement("div", { className: "flex items-center gap-1 text-[11px] text-[#626264] cursor-pointer hover:text-[#CE2C3C] transition mt-1" },
                        React.createElement("span", null,
                            "\uD83D\uDCCD Enviar a: ",
                            React.createElement("strong", { className: "underline text-[#CE2C3C]" }, "Seleccionar C.P."))),
                    React.createElement("div", { className: "flex items-center gap-3 " },
                        React.createElement("button", { className: "flex-col items-center  gap-1 text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition" },
                            React.createElement(lucide_react_1.ShoppingCart, { className: "w-4 h-4 text-zinc-800 justify-self-center" }),
                            React.createElement("span", { className: "text-xs" }, "Carrito")),
                        React.createElement("button", { className: "flex-col items-center gap-1 text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition" },
                            React.createElement(lucide_react_1.User, { className: "w-4 h-4 text-zinc-800 justify-self-center" }),
                            React.createElement("span", { className: "text-xs" }, "Cuenta")))))),
        React.createElement("div", { className: "fixed inset-y-0 left-0 bg-white w-64 border-r border-[#E4E4E7] shadow-lg transform transition-transform duration-300 ease-in-out z-50 p-6 flex flex-col gap-6 md:hidden " + (mobileMenuOpen ? "translate-x-0" : "-translate-x-full") },
            React.createElement("div", { className: "flex items-center justify-between border-b border-[#E4E4E7] pb-4" },
                React.createElement(link_1["default"], { href: "/", className: "flex align-center justify-center flex-1" },
                    React.createElement("img", { src: "/images/logo.png", alt: "Muebler\u00EDas Ahorram\u00E1s", className: "h-8 md:h-12 w-auto object-contain" })),
                React.createElement("button", { onClick: function () { return setMobileMenuOpen(false); }, className: "text-[#626264] hover:text-[#CE2C3C]" },
                    React.createElement(lucide_react_1.X, { className: "w-6 h-6" }))),
            React.createElement("div", { className: "flex flex-col gap-4 text-sm font-semibold text-[#626264]" }, categoryNavigation_1.CATEGORY_NAV_ITEMS.map(function (item) { return (React.createElement(link_1["default"], { key: item.label, href: item.href, onClick: function () { return setMobileMenuOpen(false); }, className: getLinkClass(item.href, item.key) }, item.label)); })),
            React.createElement("div", { className: "border-t border-[#E4E4E7] pt-4 mt-auto" },
                React.createElement("button", { className: "w-full bg-[#CE2C3C] text-white py-2 rounded-md text-xs font-bold hover:bg-[#A8202D] transition shadow-sm mb-3" }, "Cont\u00E1ctanos")))));
}
exports["default"] = Navbar;
