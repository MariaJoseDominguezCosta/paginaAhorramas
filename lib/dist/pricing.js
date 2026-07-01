"use strict";
exports.__esModule = true;
exports.getActivePrices = void 0;
function getActivePrices(item, region) {
    var pricesByRegion = {
        chiapas: {
            lista: item.precio_lista_chiapas || 0,
            oferta: item.precio_oferta_chiapas || 0
        },
        tabasco: {
            lista: item.precio_lista_tabasco || 0,
            oferta: item.precio_oferta_tabasco || 0
        },
        tapachula: {
            lista: item.precio_lista_tapachula || 0,
            oferta: item.precio_oferta_tapachula || 0
        }
    };
    var selected = pricesByRegion[region];
    return {
        lista: selected.lista || selected.oferta,
        oferta: selected.oferta || selected.lista
    };
}
exports.getActivePrices = getActivePrices;
