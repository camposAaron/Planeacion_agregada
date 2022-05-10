"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FuerzaConstante_1 = require("./models/FuerzaConstante");
const ProduccionExactaManoObraVariable_1 = require("./models/ProduccionExactaManoObraVariable");
const Requisitos_1 = require("./models/Requisitos");
const SubContratacion_1 = require("./models/SubContratacion");
class PlaneacionAgregada {
    constructor(demanda, costos) {
        this.demanda = demanda;
        this.requisitos = [];
        this.costos = costos;
        this.planeacionExacta = [];
        this.planeacionFuerzaConstante = [];
        this.planeacionSubContratacion = [];
    }
    getRequisitos() {
        return this.requisitos;
    }
    getPlaneacionExacta() {
        return this.planeacionExacta;
    }
    getPlaneacionFuerzaConstante() {
        return this.planeacionFuerzaConstante;
    }
    getPlaneacionSubContratacion() {
        return this.planeacionSubContratacion;
    }
    setCostos(costos) {
        this.costos = costos;
    }
    CalcularRequisitos() {
        var reqPivote = new Requisitos_1.Requisito();
        var req;
        //segun la demanda
        this.demanda.forEach((value, index) => {
            req = new Requisitos_1.Requisito();
            if (index === 0) {
                req.mes = value.mes;
                req.inventarioInicial = this.costos.InventarioInicial;
                req.pronosticoDemanda = value.pronosticoDemanda;
                req.inventarioSeguridad = req.pronosticoDemanda * this.costos.InventarioSeguridad;
                req.requerimientoProduccion = req.inventarioSeguridad + req.pronosticoDemanda - req.inventarioInicial;
                req.inventarioFinal = req.inventarioInicial + req.requerimientoProduccion - req.pronosticoDemanda;
                reqPivote = req;
                this.requisitos.push(req);
            }
            else {
                req.mes = value.mes;
                req.inventarioInicial = reqPivote.inventarioFinal;
                req.pronosticoDemanda = value.pronosticoDemanda;
                req.inventarioSeguridad = req.pronosticoDemanda * this.costos.InventarioSeguridad;
                req.requerimientoProduccion = req.inventarioSeguridad + req.pronosticoDemanda - req.inventarioInicial;
                req.inventarioFinal = req.inventarioInicial + req.requerimientoProduccion - req.pronosticoDemanda;
                reqPivote = req;
                this.requisitos.push(req);
            }
        });
    }
    PlaneacionExacta() {
        var planning;
        var cantidadTrabajadoresPeriodoAnterior = 0;
        this.requisitos.forEach((value, index) => {
            planning = new ProduccionExactaManoObraVariable_1.ProduccionExactaManoObraVariable();
            planning.mes = value.mes;
            planning.RequerimientoProducccion = value.requerimientoProduccion;
            planning.HorasProduccionReq = planning.RequerimientoProducccion * this.costos.HrsLaboralesReq;
            planning.DiasHabiles = this.demanda[index].diasHabiles;
            planning.HorasMesXTrabajador = planning.DiasHabiles * 8;
            planning.TrabajadoresReq = Math.ceil(planning.HorasProduccionReq / planning.HorasMesXTrabajador);
            planning.NuevosTrabajadoresContractados = Math.ceil(planning.TrabajadoresReq - cantidadTrabajadoresPeriodoAnterior);
            if ((planning.NuevosTrabajadoresContractados > 0 && index === 0) || (planning.NuevosTrabajadoresContractados < 0 && index !== 0))
                planning.NuevosTrabajadoresContractados = 0;
            planning.CostosContratacion = planning.NuevosTrabajadoresContractados * this.costos.CstContratacionCapacitacion;
            planning.DespidosTrabajadores = cantidadTrabajadoresPeriodoAnterior - planning.TrabajadoresReq;
            if (planning.DespidosTrabajadores < 0)
                planning.DespidosTrabajadores = 0;
            planning.CostosDespidos = planning.DespidosTrabajadores * this.costos.CstDespido;
            planning.CostoTiempoNormal = planning.HorasProduccionReq * this.costos.CstTiempoNormal;
            //pivote
            cantidadTrabajadoresPeriodoAnterior = planning.TrabajadoresReq;
            this.planeacionExacta.push(planning);
        });
    }
    fuerzaConstante() {
        var planning = new FuerzaConstante_1.FuerzaConstante();
        var inventarioFinalPeriodoAnterior = 0;
        this.demanda.forEach((value, index) => {
            planning = new FuerzaConstante_1.FuerzaConstante();
            planning.mes = value.mes;
            planning.DiasHabiles = this.demanda[index].diasHabiles;
            if (index === 0)
                planning.InventarioInicial = this.requisitos[index].inventarioInicial;
            else
                planning.InventarioInicial = inventarioFinalPeriodoAnterior;
            planning.HrsProduccionDisponibles = this.demanda[index].diasHabiles * 8 * this.NoTrabjadores;
            planning.ProduccionReal = planning.HrsProduccionDisponibles / this.costos.HrsLaboralesReq;
            planning.PronosticoDemanda = this.demanda[index].pronosticoDemanda;
            planning.InventarioFinal = planning.InventarioInicial + planning.ProduccionReal - planning.PronosticoDemanda;
            if (planning.InventarioFinal < 0)
                planning.CostoEscasez = this.costos.CstMarginalInventarioAgotado * planning.InventarioFinal * -1;
            else
                planning.CostoEscasez = 0;
            planning.InventarioSeguridad = this.requisitos[index].inventarioSeguridad;
            planning.UnidadesExceso = planning.InventarioFinal - planning.InventarioSeguridad;
            if (planning.UnidadesExceso < 0)
                planning.UnidadesExceso = 0;
            planning.CostoInventarios = planning.UnidadesExceso * this.costos.CstMantenimientoInventario;
            planning.CostosTiempoNormal = planning.HrsProduccionDisponibles * this.costos.CstTiempoNormal;
            inventarioFinalPeriodoAnterior = planning.InventarioFinal;
            this.planeacionFuerzaConstante.push(planning);
        });
    }
    subContratacion() {
        var planning;
        console.log(this.demandaMinimaTrabajadores);
        this.demanda.forEach((value, index) => {
            planning = new SubContratacion_1.SubContratacion();
            planning.mes = this.demanda[index].mes;
            planning.requerimientoProduccion = this.requisitos[index].requerimientoProduccion;
            planning.DiasHabiles = this.demanda[index].diasHabiles;
            planning.HrsProduccionDisponibles = this.demanda[index].diasHabiles * 8 * this.demandaMinimaTrabajadores;
            planning.ProduccionReal = planning.HrsProduccionDisponibles / this.costos.HrsLaboralesReq;
            planning.UnidadesSubContratadas = planning.requerimientoProduccion - planning.ProduccionReal;
            planning.CostoSubcontratacion = planning.UnidadesSubContratadas * this.costos.CstMarginalSubcontratacion;
            planning.CostosTiempoNormal = planning.HrsProduccionDisponibles * this.costos.CstTiempoNormal;
            this.planeacionSubContratacion.push(planning);
        });
    }
    get demandaMinimaTrabajadores() {
        var _a, _b;
        const cantidades = [];
        const dias = [];
        this.requisitos.forEach((value) => {
            cantidades.push(value.requerimientoProduccion);
        });
        const cantidadMinima = Math.min(...cantidades);
        const mes = (_a = this.requisitos.find(value => value.requerimientoProduccion === cantidadMinima)) === null || _a === void 0 ? void 0 : _a.mes;
        const diasHabiles = ((_b = this.demanda.find(value => value.mes === mes)) === null || _b === void 0 ? void 0 : _b.diasHabiles) || 0;
        return Math.floor((cantidadMinima * this.costos.HrsLaboralesReq) / (diasHabiles * 8));
    }
    get NoTrabjadores() {
        var demandaTotal = 0;
        var diasTotalesReq = 0;
        this.demanda.forEach((value) => {
            demandaTotal += value.pronosticoDemanda;
            diasTotalesReq += value.diasHabiles;
        });
        return Math.ceil((demandaTotal * this.costos.HrsLaboralesReq) / (diasTotalesReq * 8));
    }
}
//PROBANDO
const demanda = [
    { mes: 'Enero', diasHabiles: 22, pronosticoDemanda: 1800 },
    { mes: 'Febrero', diasHabiles: 19, pronosticoDemanda: 1500 },
    { mes: 'Marzo', diasHabiles: 21, pronosticoDemanda: 1100 },
    { mes: 'Abril', diasHabiles: 21, pronosticoDemanda: 900 },
    { mes: 'Mayo', diasHabiles: 22, pronosticoDemanda: 1100 },
    { mes: 'Junio', diasHabiles: 20, pronosticoDemanda: 1600 }
];
const costos = {
    Materiales: 100,
    CstMantenimientoInventario: 1.5,
    CstMarginalInventarioAgotado: 5,
    CstMarginalSubcontratacion: 20,
    CstContratacionCapacitacion: 200,
    CstDespido: 250,
    HrsLaboralesReq: 5,
    CstTiempoNormal: 4,
    CstTiempoExtra: 6,
    InventarioInicial: 400,
    InventarioSeguridad: 0.25
};
//requisitos de planeacion
const miPlaneacion = new PlaneacionAgregada(demanda, costos);
miPlaneacion.CalcularRequisitos();
console.log(miPlaneacion.getRequisitos());
//planeacion #1
miPlaneacion.PlaneacionExacta();
console.log(miPlaneacion.getPlaneacionExacta());
//planeacion #2
miPlaneacion.fuerzaConstante();
console.log(miPlaneacion.getPlaneacionFuerzaConstante());
//planeacion #3
miPlaneacion.subContratacion();
console.log(miPlaneacion.getPlaneacionSubContratacion());
