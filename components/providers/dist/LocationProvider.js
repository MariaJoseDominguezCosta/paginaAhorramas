"use client";
"use strict";
exports.__esModule = true;
exports.useLocation = exports.LocationProvider = void 0;
var react_1 = require("react");
var location_1 = require("@/lib/location");
var LocationContext = react_1.createContext(null);
function LocationProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(function () {
        if (typeof window === "undefined")
            return null;
        var fromStorage = window.localStorage.getItem(location_1.POSTAL_CODE_REGION_STORAGE_KEY);
        var fromCookie = location_1.readCookie(location_1.POSTAL_CODE_REGION_COOKIE_KEY);
        var candidate = (fromStorage || fromCookie || "");
        if (candidate === "chiapas" || candidate === "tabasco" || candidate === "tapachula") {
            return candidate;
        }
        return null;
    }), preferredRegion = _b[0], setPreferredRegionState = _b[1];
    var _c = react_1.useState(function () {
        if (typeof window === "undefined")
            return "";
        var fromStorage = window.localStorage.getItem(location_1.POSTAL_CODE_STORAGE_KEY);
        var fromCookie = location_1.readCookie(location_1.POSTAL_CODE_COOKIE_KEY);
        var initial = location_1.normalizePostalCode(fromStorage || fromCookie || "");
        if (!initial || !location_1.isPostalCodeFormatValid(initial)) {
            return "";
        }
        var resolvedRegion = location_1.resolveRegionByPostalCode(initial, preferredRegion);
        if (!resolvedRegion) {
            return "";
        }
        return initial;
    }), postalCode = _c[0], setPostalCodeState = _c[1];
    var region = react_1.useMemo(function () {
        if (!postalCode)
            return null;
        return location_1.resolveRegionByPostalCode(postalCode, preferredRegion);
    }, [postalCode, preferredRegion]);
    var ambiguousRegions = react_1.useMemo(function () {
        if (!postalCode)
            return [];
        var candidates = location_1.getRegionsForPostalCode(postalCode);
        return candidates.length > 1 ? candidates : [];
    }, [postalCode]);
    var setPostalCode = react_1.useCallback(function (value, preferredRegionOverride) {
        var normalized = location_1.normalizePostalCode(value);
        if (!location_1.isPostalCodeFormatValid(normalized)) {
            return { ok: false, message: "Ingresa un C.P. de 5 dígitos." };
        }
        var regions = location_1.getRegionsForPostalCode(normalized);
        if (regions.length === 0) {
            return { ok: false, message: "No encontramos cobertura para ese C.P." };
        }
        var preferred = preferredRegionOverride !== null && preferredRegionOverride !== void 0 ? preferredRegionOverride : preferredRegion;
        var resolvedRegion = location_1.resolveRegionByPostalCode(normalized, preferred);
        if (!resolvedRegion) {
            return {
                ok: false,
                message: "Este C.P. existe en mas de una zona. Selecciona estado.",
                ambiguousRegions: regions
            };
        }
        setPostalCodeState(normalized);
        setPreferredRegionState(resolvedRegion);
        window.localStorage.setItem(location_1.POSTAL_CODE_STORAGE_KEY, normalized);
        window.localStorage.setItem(location_1.POSTAL_CODE_REGION_STORAGE_KEY, resolvedRegion);
        location_1.setCookie(location_1.POSTAL_CODE_COOKIE_KEY, normalized);
        location_1.setCookie(location_1.POSTAL_CODE_REGION_COOKIE_KEY, resolvedRegion);
        return { ok: true };
    }, [preferredRegion]);
    var setPreferredRegion = react_1.useCallback(function (nextRegion) {
        if (!postalCode) {
            return { ok: false, message: "Primero ingresa un C.P." };
        }
        var regions = location_1.getRegionsForPostalCode(postalCode);
        if (!regions.includes(nextRegion)) {
            return { ok: false, message: "La zona no coincide con ese C.P." };
        }
        setPreferredRegionState(nextRegion);
        window.localStorage.setItem(location_1.POSTAL_CODE_REGION_STORAGE_KEY, nextRegion);
        location_1.setCookie(location_1.POSTAL_CODE_REGION_COOKIE_KEY, nextRegion);
        return { ok: true };
    }, [postalCode]);
    var clearPostalCode = react_1.useCallback(function () {
        setPostalCodeState("");
        setPreferredRegionState(null);
        window.localStorage.removeItem(location_1.POSTAL_CODE_STORAGE_KEY);
        window.localStorage.removeItem(location_1.POSTAL_CODE_REGION_STORAGE_KEY);
        location_1.deleteCookie(location_1.POSTAL_CODE_COOKIE_KEY);
        location_1.deleteCookie(location_1.POSTAL_CODE_REGION_COOKIE_KEY);
    }, []);
    var value = react_1.useMemo(function () { return ({
        postalCode: postalCode,
        region: region,
        hasValidPostalCode: Boolean(postalCode && region),
        ambiguousRegions: ambiguousRegions,
        setPostalCode: setPostalCode,
        setPreferredRegion: setPreferredRegion,
        clearPostalCode: clearPostalCode
    }); }, [postalCode, region, ambiguousRegions, setPostalCode, setPreferredRegion, clearPostalCode]);
    return React.createElement(LocationContext.Provider, { value: value }, children);
}
exports.LocationProvider = LocationProvider;
function useLocation() {
    var context = react_1.useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation debe usarse dentro de LocationProvider");
    }
    return context;
}
exports.useLocation = useLocation;
