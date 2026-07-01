"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var categoryNavigation_1 = require("@/lib/categoryNavigation");
var location_1 = require("@/lib/location");
var LocationProvider_1 = require("@/components/providers/LocationProvider");
var POSTAL_MODAL_DISMISSED_KEY = "ahorramas_postal_modal_dismissed";
function formatRegionLabel(region) {
    if (region === "chiapas")
        return "Chiapas";
    if (region === "tabasco")
        return "Tabasco";
    return "Tapachula";
}
function Navbar() {
    var router = navigation_1.useRouter();
    var pathname = navigation_1.usePathname();
    var searchParams = navigation_1.useSearchParams();
    var searchQueryInUrl = searchParams.get("q") || "";
    var _a = react_1.useState(searchQueryInUrl), query = _a[0], setQuery = _a[1];
    var _b = react_1.useState(false), isNavbarSearching = _b[0], setIsNavbarSearching = _b[1];
    var _c = react_1.useState(false), mobileMenuOpen = _c[0], setMobileMenuOpen = _c[1];
    var _d = react_1.useState(false), postalModalOpen = _d[0], setPostalModalOpen = _d[1];
    var _e = react_1.useState(function () {
        if (typeof window === "undefined")
            return false;
        return window.sessionStorage.getItem(POSTAL_MODAL_DISMISSED_KEY) === "1";
    }), postalModalDismissedForSession = _e[0], setPostalModalDismissedForSession = _e[1];
    var _f = LocationProvider_1.useLocation(), postalCode = _f.postalCode, region = _f.region, hasValidPostalCode = _f.hasValidPostalCode, ambiguousRegions = _f.ambiguousRegions, setPostalCode = _f.setPostalCode, clearPostalCode = _f.clearPostalCode;
    var _g = react_1.useState(postalCode), postalCodeInput = _g[0], setPostalCodeInput = _g[1];
    var _h = react_1.useState(""), postalCodeMessage = _h[0], setPostalCodeMessage = _h[1];
    var _j = react_1.useState([]), pendingAmbiguousRegions = _j[0], setPendingAmbiguousRegions = _j[1];
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
    function clearPostalModalDismissal() {
        if (typeof window === "undefined")
            return;
        window.sessionStorage.removeItem(POSTAL_MODAL_DISMISSED_KEY);
    }
    function dismissPostalModalForSession() {
        if (typeof window === "undefined")
            return;
        window.sessionStorage.setItem(POSTAL_MODAL_DISMISSED_KEY, "1");
    }
    function openPostalModal() {
        setPostalCodeInput(postalCode || "");
        setPostalCodeMessage("");
        setPendingAmbiguousRegions([]);
        setPostalModalDismissedForSession(false);
        clearPostalModalDismissal();
        setPostalModalOpen(true);
    }
    function closePostalModal() {
        setPostalModalOpen(false);
        if (!hasValidPostalCode) {
            setPostalModalDismissedForSession(true);
            dismissPostalModalForSession();
        }
    }
    function handlePostalCodeSubmit(event) {
        event.preventDefault();
        var result = setPostalCode(postalCodeInput);
        if (!result.ok) {
            setPostalCodeMessage(result.message || "No se pudo guardar el C.P.");
            setPendingAmbiguousRegions(result.ambiguousRegions || []);
            return;
        }
        setPostalCodeInput(location_1.normalizePostalCode(postalCodeInput));
        setPostalCodeMessage("C.P. guardado correctamente.");
        setPendingAmbiguousRegions([]);
        setPostalModalOpen(false);
        setPostalModalDismissedForSession(false);
        clearPostalModalDismissal();
    }
    function handleAmbiguousRegionSelect(selectedRegion) {
        var result = setPostalCode(postalCodeInput, selectedRegion);
        if (!result.ok) {
            setPostalCodeMessage(result.message || "No se pudo guardar la zona.");
            return;
        }
        setPostalCodeMessage("Zona confirmada: " + formatRegionLabel(selectedRegion) + ".");
        setPendingAmbiguousRegions([]);
        setPostalModalOpen(false);
        setPostalModalDismissedForSession(false);
        clearPostalModalDismissal();
    }
    function handlePostalCodeClear() {
        clearPostalCode();
        setPostalCodeInput("");
        setPostalCodeMessage("C.P. eliminado.");
        setPendingAmbiguousRegions([]);
        setPostalModalDismissedForSession(false);
        clearPostalModalDismissal();
    }
    var regionsToResolve = pendingAmbiguousRegions.length > 0 ? pendingAmbiguousRegions : ambiguousRegions;
    var shouldAutoOpenPostalModal = !hasValidPostalCode && !postalModalDismissedForSession;
    var isPostalModalVisible = postalModalOpen || shouldAutoOpenPostalModal;
    return (React.createElement("nav", { className: "bg-[#F4F4F5] border-b border-[#E4E4E7] sticky top-0 z-50" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col gap-3" },
            React.createElement("div", { className: "flex items-center justify-between gap-4" },
                React.createElement("button", { onClick: function () { return setMobileMenuOpen(!mobileMenuOpen); }, className: "p-1 text-[#626264] hover:text-[#CE2C3C] transition md:hidden focus:outline-none", "aria-label": "Abrir men\u00FA" }, mobileMenuOpen ? React.createElement(lucide_react_1.X, { className: "w-6 h-6" }) : React.createElement(lucide_react_1.Menu, { className: "w-6 h-6" })),
                React.createElement("div", { className: "items-center sm:hidden md:flex flex-col gap-2 w-auto object-contain " },
                    React.createElement(link_1["default"], { href: "/" },
                        React.createElement("img", { src: "/images/logo.png", alt: "Muebler\u00EDas Ahorram\u00E1s", className: "md:h-12 w-auto object-contain" })),
                    React.createElement("div", { className: "flex items-center gap-1.5 text-xs text-[#626264]" },
                        React.createElement(lucide_react_1.MapPin, { className: "w-4 h-4 text-zinc-800" }),
                        hasValidPostalCode ? (React.createElement("span", null,
                            "C.P. activo: ",
                            React.createElement("strong", { className: "text-[#CE2C3C]" }, postalCode))) : (React.createElement("span", null, "Enviar a:")),
                        React.createElement("button", { type: "button", onClick: openPostalModal, className: "text-[11px] font-bold underline text-[#CE2C3C] hover:text-[#A8202D]" }, hasValidPostalCode ? "Cambiar C.P." : "Ingresar C.P."),
                        hasValidPostalCode && (React.createElement("button", { type: "button", onClick: handlePostalCodeClear, className: "text-[10px] font-bold text-zinc-500 underline hover:text-[#CE2C3C]" }, "Limpiar"))),
                    postalCodeMessage && (React.createElement("p", { className: "text-[10px] text-zinc-500" }, postalCodeMessage)),
                    hasValidPostalCode && region && (React.createElement("p", { className: "text-[10px] font-semibold text-zinc-600" },
                        "Zona activa: ",
                        React.createElement("span", { className: "text-[#CE2C3C]" }, formatRegionLabel(region))))),
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
                    React.createElement("div", { className: "flex items-center gap-1 text-[11px] text-[#626264] mt-1" },
                        React.createElement("span", null, "\uD83D\uDCCD"),
                        React.createElement("button", { type: "button", onClick: openPostalModal, className: "rounded-md bg-[#CE2C3C] px-2 py-1 text-[10px] font-bold text-white" }, hasValidPostalCode ? postalCode : "Ingresar C.P.")),
                    hasValidPostalCode && region && (React.createElement("p", { className: "text-[10px] font-semibold text-zinc-600 mt-1" }, formatRegionLabel(region))),
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
                React.createElement("button", { className: "w-full bg-[#CE2C3C] text-white py-2 rounded-md text-xs font-bold hover:bg-[#A8202D] transition shadow-sm mb-3" }, "Cont\u00E1ctanos"))),
        isPostalModalVisible && (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/35 px-4", role: "dialog", "aria-modal": "true", "aria-label": "Seleccion de codigo postal" },
            React.createElement("div", { className: "w-full max-w-md rounded-3xl bg-[#f1f1f2] p-6 shadow-xl border border-zinc-200" },
                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-2xl font-extrabold text-zinc-900" }, "Selecciona tu Regi\u00F3n de Env\u00EDo"),
                        React.createElement("p", { className: "mt-1 text-sm text-zinc-500" }, "Manejamos diferentes costos de cobertura para Chiapas y Tabasco.")),
                    React.createElement("button", { type: "button", onClick: closePostalModal, className: "rounded-md p-1 text-zinc-500 hover:text-[#CE2C3C]", "aria-label": "Cerrar" },
                        React.createElement(lucide_react_1.X, { className: "h-5 w-5" }))),
                React.createElement("form", { onSubmit: handlePostalCodeSubmit, className: "mt-5 space-y-3" },
                    React.createElement("input", { type: "text", inputMode: "numeric", maxLength: 5, value: postalCodeInput, onChange: function (event) {
                            setPostalCodeInput(location_1.normalizePostalCode(event.target.value));
                            if (postalCodeMessage)
                                setPostalCodeMessage("");
                        }, placeholder: "Ingresa tu C.P. (Ej.29000 o 86000)", className: "w-full rounded-xl border border-zinc-300 bg-[#f7f7f7] px-4 py-3 text-base text-zinc-700 outline-none focus:border-[#CE2C3C]", "aria-label": "Codigo postal" }),
                    React.createElement("button", { type: "submit", className: "w-full rounded-xl bg-[#CE2C3C] px-4 py-3 text-base font-bold text-white hover:bg-[#A8202D]" }, "Aplicar C\u00F3digo Postal")),
                postalCodeMessage && (React.createElement("p", { className: "mt-3 text-xs text-zinc-600" }, postalCodeMessage)),
                hasValidPostalCode && region && (React.createElement("p", { className: "mt-2 text-xs font-semibold text-zinc-700" },
                    "Zona activa: ",
                    React.createElement("span", { className: "text-[#CE2C3C]" }, formatRegionLabel(region)))),
                regionsToResolve.length > 1 && (React.createElement("div", { className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-600" },
                    React.createElement("span", { className: "font-semibold" }, "Selecciona zona:"),
                    regionsToResolve.map(function (regionOption) { return (React.createElement("button", { key: regionOption, type: "button", onClick: function () { return handleAmbiguousRegionSelect(regionOption); }, className: "rounded-lg border border-zinc-300 bg-white px-3 py-1 font-bold hover:border-[#CE2C3C] hover:text-[#CE2C3C]" }, formatRegionLabel(regionOption))); }))),
                hasValidPostalCode && (React.createElement("button", { type: "button", onClick: handlePostalCodeClear, className: "mt-4 text-xs font-bold text-zinc-500 underline hover:text-[#CE2C3C]" }, "Limpiar C.P.")))))));
}
exports["default"] = Navbar;
