export class FuerzaConstante {
    private _mes!: string;
    private _InventarioInicial!: number;
    private _DiasHabiles!: number;
    private _HrsProduccionDisponibles!: number;
    private _ProduccionReal!: number;
    private _PronosticoDemanda!: number;
    private _InventarioFinal!: number;
    private _CostoEscasez!: number;
    private _InventarioSeguridad!: number;
    private _UnidadesExceso!: number;
    private _CostoInventarios!: number;
    private _CostosTiempoNormal!: number;
    
    public get mes(): string {
        return this._mes;
    }
    public set mes(value: string) {
        this._mes = value;
    }
    public get InventarioInicial(): number {
        return this._InventarioInicial;
    }
    public set InventarioInicial(value: number) {
        this._InventarioInicial = value;
    }


    public get DiasHabiles(): number {
        return this._DiasHabiles;
    }
    public set DiasHabiles(value: number) {
        this._DiasHabiles = value;
    }

    public get HrsProduccionDisponibles(): number {
        return this._HrsProduccionDisponibles;
    }
    public set HrsProduccionDisponibles(value: number) {
        this._HrsProduccionDisponibles = value;
    }

    public get ProduccionReal(): number {
        return this._ProduccionReal;
    }
    public set ProduccionReal(value: number) {
        this._ProduccionReal = value;
    }

    public get PronosticoDemanda(): number {
        return this._PronosticoDemanda;
    }
    public set PronosticoDemanda(value: number) {
        this._PronosticoDemanda = value;
    }


    public get InventarioFinal(): number {
        return this._InventarioFinal;
    }
    public set InventarioFinal(value: number) {
        this._InventarioFinal = value;
    }

    public get CostoEscasez(): number {
        return this._CostoEscasez;
    }
    public set CostoEscasez(value: number) {
        this._CostoEscasez = value;
    }

    public get InventarioSeguridad(): number {
        return this._InventarioSeguridad;
    }
    public set InventarioSeguridad(value: number) {
        this._InventarioSeguridad = value;
    }

    public get UnidadesExceso(): number {
        return this._UnidadesExceso;
    }
    public set UnidadesExceso(value: number) {
        this._UnidadesExceso = value;
    }

    public get CostoInventarios(): number {
        return this._CostoInventarios;
    }
    public set CostoInventarios(value: number) {
        this._CostoInventarios = value;
    }

    public get CostosTiempoNormal(): number {
        return this._CostosTiempoNormal;
    }
    public set CostosTiempoNormal(value: number) {
        this._CostosTiempoNormal = value;
    }
}