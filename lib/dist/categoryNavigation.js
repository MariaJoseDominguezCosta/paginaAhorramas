"use strict";
exports.__esModule = true;
exports.categoryFromPathname = exports.normalizeCategoryToNavKey = exports.CATEGORY_COLOR_CLASSES = exports.CATEGORY_NAV_ITEMS = void 0;
exports.CATEGORY_NAV_ITEMS = [
    { label: "Inicio", href: "/" },
    { label: "Salas", href: "/salas", key: "salas" },
    { label: "Recámaras", href: "/recamaras", key: "recamaras" },
    { label: "Comedores", href: "/comedores", key: "comedores" },
    { label: "Colchones", href: "/colchones", key: "colchones" },
    { label: "Muebles TV", href: "/tv", key: "tv" },
    { label: "Otros Muebles", href: "/otros", key: "otros" },
    { label: "Nosotros", href: "/nosotros" },
];
exports.CATEGORY_COLOR_CLASSES = {
    salas: { active: "text-[#CE2C3C]", hover: "hover:text-[#CE2C3C]" },
    recamaras: { active: "text-[#D97706]", hover: "hover:text-[#D97706]" },
    comedores: { active: "text-[#0F766E]", hover: "hover:text-[#0F766E]" },
    colchones: { active: "text-[#2563EB]", hover: "hover:text-[#2563EB]" },
    tv: { active: "text-[#0F172A]", hover: "hover:text-[#0F172A]" },
    otros: { active: "text-[#475569]", hover: "hover:text-[#475569]" }
};
function normalizeText(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}
function normalizeCategoryToNavKey(raw) {
    if (!raw)
        return null;
    var normalized = normalizeText(raw);
    if (normalized.includes("sala"))
        return "salas";
    if (normalized.includes("recamara"))
        return "recamaras";
    if (normalized.includes("comedor"))
        return "comedores";
    if (normalized.includes("colchon"))
        return "colchones";
    if (normalized.includes("tv"))
        return "tv";
    if (normalized.includes("otro"))
        return "otros";
    return null;
}
exports.normalizeCategoryToNavKey = normalizeCategoryToNavKey;
function categoryFromPathname(pathname) {
    if (pathname.startsWith("/salas"))
        return "salas";
    if (pathname.startsWith("/recamaras"))
        return "recamaras";
    if (pathname.startsWith("/comedores"))
        return "comedores";
    if (pathname.startsWith("/colchones"))
        return "colchones";
    if (pathname.startsWith("/tv"))
        return "tv";
    if (pathname.startsWith("/otros"))
        return "otros";
    return null;
}
exports.categoryFromPathname = categoryFromPathname;
