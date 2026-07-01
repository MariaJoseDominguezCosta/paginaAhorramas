"use strict";
exports.__esModule = true;
exports.deleteCookie = exports.setCookie = exports.readCookie = exports.resolveRegionByPostalCode = exports.getRegionsForPostalCode = exports.isPostalCodeFormatValid = exports.normalizePostalCode = exports.POSTAL_CODE_REGION_COOKIE_KEY = exports.POSTAL_CODE_REGION_STORAGE_KEY = exports.POSTAL_CODE_COOKIE_KEY = exports.POSTAL_CODE_STORAGE_KEY = void 0;
var chiapas_json_1 = require("@/data/postal-codes/chiapas.json");
var tabasco_json_1 = require("@/data/postal-codes/tabasco.json");
var tapachula_json_1 = require("@/data/postal-codes/tapachula.json");
exports.POSTAL_CODE_STORAGE_KEY = "ahorramas.postalCode";
exports.POSTAL_CODE_COOKIE_KEY = "ahorramas_postal_code";
exports.POSTAL_CODE_REGION_STORAGE_KEY = "ahorramas.postalRegion";
exports.POSTAL_CODE_REGION_COOKIE_KEY = "ahorramas_postal_region";
function createPostalCodeSet(values) {
    return new Set(values.map(normalizePostalCode).filter(isPostalCodeFormatValid));
}
var TAPACHULA_POSTAL_CODES = createPostalCodeSet(tapachula_json_1["default"]);
var TABASCO_POSTAL_CODES = createPostalCodeSet(tabasco_json_1["default"]);
var CHIAPAS_POSTAL_CODES = createPostalCodeSet(chiapas_json_1["default"]);
// Fallback temporal mientras se completa la carga de C.P. reales.
var TABASCO_PREFIXES = ["86"];
var CHIAPAS_PREFIXES = ["29"];
function normalizePostalCode(value) {
    return value.replace(/\D/g, "").slice(0, 5);
}
exports.normalizePostalCode = normalizePostalCode;
function isPostalCodeFormatValid(value) {
    return /^\d{5}$/.test(value);
}
exports.isPostalCodeFormatValid = isPostalCodeFormatValid;
function getRegionsForPostalCode(postalCode) {
    var normalized = normalizePostalCode(postalCode);
    if (!isPostalCodeFormatValid(normalized)) {
        return [];
    }
    if (TAPACHULA_POSTAL_CODES.has(normalized)) {
        return ["tapachula"];
    }
    var exactRegions = [];
    if (TABASCO_POSTAL_CODES.has(normalized)) {
        exactRegions.push("tabasco");
    }
    if (CHIAPAS_POSTAL_CODES.has(normalized)) {
        exactRegions.push("chiapas");
    }
    if (exactRegions.length > 0) {
        return exactRegions;
    }
    if (TABASCO_PREFIXES.some(function (prefix) { return normalized.startsWith(prefix); })) {
        return ["tabasco"];
    }
    if (CHIAPAS_PREFIXES.some(function (prefix) { return normalized.startsWith(prefix); })) {
        return ["chiapas"];
    }
    return [];
}
exports.getRegionsForPostalCode = getRegionsForPostalCode;
function resolveRegionByPostalCode(postalCode, preferredRegion) {
    var regions = getRegionsForPostalCode(postalCode);
    if (regions.length === 0) {
        return null;
    }
    if (preferredRegion && regions.includes(preferredRegion)) {
        return preferredRegion;
    }
    if (regions.length === 1) {
        return regions[0];
    }
    return null;
}
exports.resolveRegionByPostalCode = resolveRegionByPostalCode;
function readCookie(name) {
    if (typeof document === "undefined")
        return null;
    var encodedName = encodeURIComponent(name) + "=";
    var cookies = document.cookie.split(";");
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var trimmed = cookie.trim();
        if (trimmed.startsWith(encodedName)) {
            return decodeURIComponent(trimmed.slice(encodedName.length));
        }
    }
    return null;
}
exports.readCookie = readCookie;
function setCookie(name, value, days) {
    if (days === void 0) { days = 365; }
    if (typeof document === "undefined")
        return;
    var maxAge = days * 24 * 60 * 60;
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/; max-age=" + maxAge + "; samesite=lax";
}
exports.setCookie = setCookie;
function deleteCookie(name) {
    if (typeof document === "undefined")
        return;
    document.cookie = encodeURIComponent(name) + "=; path=/; max-age=0; samesite=lax";
}
exports.deleteCookie = deleteCookie;
