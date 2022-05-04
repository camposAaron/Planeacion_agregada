"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requisito = void 0;
;
class Requisito {
    constructor() { }
    get mes() {
        return this._mes;
    }
    set mes(value) {
        this._mes = value;
    }
    get inventarioInicial() {
        return this._inventarioInicial;
    }
    set inventarioInicial(value) {
        this._inventarioInicial = value;
    }
    get pronosticoDemanda() {
        return this._pronosticoDemanda;
    }
    set pronosticoDemanda(value) {
        this._pronosticoDemanda = value;
    }
    get inventarioSeguridad() {
        return this._inventarioSeguridad;
    }
    set inventarioSeguridad(value) {
        this._inventarioSeguridad = value;
    }
    get requerimientoProduccion() {
        return this._requerimientoProduccion;
    }
    set requerimientoProduccion(value) {
        this._requerimientoProduccion = value;
    }
    get inventarioFinal() {
        return this._inventarioFinal;
    }
    set inventarioFinal(value) {
        this._inventarioFinal = value;
    }
}
exports.Requisito = Requisito;
