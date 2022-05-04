import { ProduccionExactaManoObraVariable } from "./ProduccionExactaManoObraVariable";

export interface Demanda {
    mes: string,
    pronosticoDemanda: number,
    diasHabiles: number
}


export interface CatalogoCosto {
    Materiales : number,
    CstMantenimientoInventario:number,
    CstMarginalInventarioAgotado:number,
    CstMarginalSubcontratacion:number,
    CstContratacionCapacitacion:number,
    CstDespido:number,
    HrsLaboralesReq:number,
    CstTiempoNormal:number,
    CstTiempoExtra:number,
    InventarioInicial:number,
    InventarioSeguridad:number
};

export class Requisito {
    private _mes!: string;
    private _inventarioInicial!: number;
    private _pronosticoDemanda!: number;
    private _inventarioSeguridad!: number;
    private _requerimientoProduccion!: number;
    private _inventarioFinal!: number;

    public get mes(): string {
        return this._mes;
    }
    public set mes(value: string) {
        this._mes = value;
    }
    public get inventarioInicial(): number {
        return this._inventarioInicial;
    }
    public set inventarioInicial(value: number) {
        this._inventarioInicial = value;
    }
    public get pronosticoDemanda(): number {
        return this._pronosticoDemanda;
    }
    public set pronosticoDemanda(value: number) {
        this._pronosticoDemanda = value;
    }
    
    public get inventarioSeguridad(): number {
        return this._inventarioSeguridad;
    }
    public set inventarioSeguridad(value: number) {
        this._inventarioSeguridad = value;
    }
    
    
    public get requerimientoProduccion(): number {
        return this._requerimientoProduccion;
    }
    
    public set requerimientoProduccion(value: number) {
        this._requerimientoProduccion = value;
    }
    
    public get inventarioFinal(): number {
        return this._inventarioFinal;
    }
    
    public set inventarioFinal(value: number) {
        this._inventarioFinal = value;
    }

    constructor(){}
}

export interface IPlaneacion {
    setCostos(costos: CatalogoCosto): void;
    CalcularRequisitos(): void;
    getRequisitos():Requisito[];
    PlaneacionExacta():void;
    getPlaneacionExacta():ProduccionExactaManoObraVariable[];
}
