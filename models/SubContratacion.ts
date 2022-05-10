export class SubContratacion {
    private _mes!: string;
    private _requerimientoProduccion!: number;
    private _DiasHabiles!: number;
    private _HrsProduccionDisponibles!: number;
    private _ProduccionReal!: number;
    private _PronosticoDemanda!: number;
    private _UnidadesSubContratadas!: number;
    private _CostoSubcontratacion!: number;
    private _CostosTiempoNormal!: number;

    public get mes(): string {
        return this._mes;
    }
    public set mes(value: string) {
        this._mes = value;
    }

    public get requerimientoProduccion(): number {
        return this._requerimientoProduccion;
    }
    public set requerimientoProduccion(value: number) {
        this._requerimientoProduccion = value;
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

    public get UnidadesSubContratadas(): number {
        return this._UnidadesSubContratadas;
    }
    public set UnidadesSubContratadas(value: number) {
        this._UnidadesSubContratadas = value;
    }

    public get CostoSubcontratacion(): number {
        return this._CostoSubcontratacion;
    }
    public set CostoSubcontratacion(value: number) {
        this._CostoSubcontratacion = value;
    }

    public get CostosTiempoNormal(): number {
        return this._CostosTiempoNormal;
    }
    public set CostosTiempoNormal(value: number) {
        this._CostosTiempoNormal = value;
    }

}