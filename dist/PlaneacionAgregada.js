"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProduccionExactaManoObraVariable_1 = require("./models/ProduccionExactaManoObraVariable");
const Requisitos_1 = require("./models/Requisitos");
class PlaneacionAgregada {
    constructor(demanda, costos) {
        this.demanda = demanda;
        this.requisitos = [];
        this.costos = costos;
        this.planeacionExacta = [];
    }
    getRequisitos() {
        return this.requisitos;
    }
    getPlaneacionExacta() {
        return this.planeacionExacta;
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
            planning.TrabajadoresReq = planning.HorasProduccionReq / planning.HorasMesXTrabajador;
            planning.NuevosTrabajadoresContractados = planning.TrabajadoresReq - cantidadTrabajadoresPeriodoAnterior;
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
const miPlaneacion = new PlaneacionAgregada(demanda, costos);
miPlaneacion.CalcularRequisitos();
console.log(miPlaneacion.getRequisitos());
miPlaneacion.PlaneacionExacta();
console.log(miPlaneacion.getPlaneacionExacta());
