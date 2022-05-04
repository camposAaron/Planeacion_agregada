import { ProduccionExactaManoObraVariable } from "./models/ProduccionExactaManoObraVariable";
import { CatalogoCosto, Demanda, IPlaneacion, Requisito } from "./models/Requisitos";


class PlaneacionAgregada implements IPlaneacion {

    private demanda: Demanda[];
    private costos: CatalogoCosto;
    private requisitos: Requisito[];
    private planeacionExacta: ProduccionExactaManoObraVariable[];


    constructor(demanda: Demanda[], costos: CatalogoCosto) {
        this.demanda = demanda
        this.requisitos = [];
        this.costos = costos;
        this.planeacionExacta = [];
    }



    getRequisitos(): Requisito[] {
        return this.requisitos;
    }

    getPlaneacionExacta():ProduccionExactaManoObraVariable[]{
        return this.planeacionExacta;
    }



    setCostos(costos: CatalogoCosto): void {
        this.costos = costos;
    }

    CalcularRequisitos(): void {
        var reqPivote = new Requisito();
        var req: Requisito;

        //segun la demanda
        this.demanda.forEach((value, index) => {
            req = new Requisito();

            if (index === 0) {
                req.mes = value.mes;
                req.inventarioInicial = this.costos.InventarioInicial;
                req.pronosticoDemanda = value.pronosticoDemanda;
                req.inventarioSeguridad = req.pronosticoDemanda * this.costos.InventarioSeguridad;
                req.requerimientoProduccion = req.inventarioSeguridad + req.pronosticoDemanda - req.inventarioInicial;
                req.inventarioFinal = req.inventarioInicial + req.requerimientoProduccion - req.pronosticoDemanda
                reqPivote = req;
                this.requisitos.push(req)


            } else {

                req.mes = value.mes;
                req.inventarioInicial = reqPivote.inventarioFinal;
                req.pronosticoDemanda = value.pronosticoDemanda;
                req.inventarioSeguridad = req.pronosticoDemanda * this.costos.InventarioSeguridad;
                req.requerimientoProduccion = req.inventarioSeguridad + req.pronosticoDemanda - req.inventarioInicial;
                req.inventarioFinal = req.inventarioInicial + req.requerimientoProduccion - req.pronosticoDemanda;
                reqPivote = req;
                this.requisitos.push(req)

            }
        })
    }

    PlaneacionExacta() {
        var planning: ProduccionExactaManoObraVariable;
        var cantidadTrabajadoresPeriodoAnterior: number = 0;

        this.requisitos.forEach((value, index) => {
            planning = new ProduccionExactaManoObraVariable();
            planning.mes = value.mes;
            planning.RequerimientoProducccion = value.requerimientoProduccion;
            planning.HorasProduccionReq = planning.RequerimientoProducccion * this.costos.HrsLaboralesReq;
            planning.DiasHabiles = this.demanda[index].diasHabiles;
            planning.HorasMesXTrabajador = planning.DiasHabiles * 8;
            planning.TrabajadoresReq = planning.HorasProduccionReq / planning.HorasMesXTrabajador;

            planning.NuevosTrabajadoresContractados = planning.TrabajadoresReq - cantidadTrabajadoresPeriodoAnterior;
            if ( (planning.NuevosTrabajadoresContractados > 0 && index === 0) || (planning.NuevosTrabajadoresContractados < 0 && index !== 0)  )
                planning.NuevosTrabajadoresContractados = 0


            planning.CostosContratacion = planning.NuevosTrabajadoresContractados * this.costos.CstContratacionCapacitacion;

            planning.DespidosTrabajadores = cantidadTrabajadoresPeriodoAnterior - planning.TrabajadoresReq;
            if (planning.DespidosTrabajadores < 0)
                planning.DespidosTrabajadores = 0

            planning.CostosDespidos = planning.DespidosTrabajadores * this.costos.CstDespido;
            planning.CostoTiempoNormal = planning.HorasProduccionReq * this.costos.CstTiempoNormal;

            //pivote
            cantidadTrabajadoresPeriodoAnterior = planning.TrabajadoresReq;
            this.planeacionExacta.push(planning);
        });
    }

   
    



}


//PROBANDO
const demanda: Demanda[] = [
    { mes: 'Enero', diasHabiles: 22, pronosticoDemanda: 1800 },
    { mes: 'Febrero', diasHabiles: 19, pronosticoDemanda: 1500 },
    { mes: 'Marzo', diasHabiles: 21, pronosticoDemanda: 1100 },
    { mes: 'Abril', diasHabiles: 21, pronosticoDemanda: 900 },
    { mes: 'Mayo', diasHabiles: 22, pronosticoDemanda: 1100 },
    { mes: 'Junio', diasHabiles: 20, pronosticoDemanda: 1600 }
]

const costos: CatalogoCosto = {
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
}

const miPlaneacion = new PlaneacionAgregada(demanda, costos);
miPlaneacion.CalcularRequisitos();
console.log(miPlaneacion.getRequisitos())
miPlaneacion.PlaneacionExacta();
console.log(miPlaneacion.getPlaneacionExacta())
