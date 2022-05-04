export class ProduccionExactaManoObraVariable{
    private _mes!: string;
    private _RequerimientoProducccion!: number;
    private _HorasProduccionReq!: number;
    private _DiasHabiles!: number;
    private _HorasMesXTrabajador!: number;
    private _TrabajadoresReq!: number;
    private _NuevosTrabajadoresContratados!: number;
    private _CostosContratacion!: number;
    private _DespidosTrabajadores!: number;
    private _CostosDespidos!: number;
    private _CostoTiempoNormal!: number;
    
    constructor(){}
    
    public get mes(): string {
        return this._mes;
    }
    public set mes(value: string) {
        this._mes = value;
    }
    public get CostoTiempoNormal(): number {
        return this._CostoTiempoNormal;
    }
    public set CostoTiempoNormal(value: number) {
        this._CostoTiempoNormal = value;
    }

    public get CostosDespidos(): number {
        return this._CostosDespidos;
    }
    public set CostosDespidos(value: number) {
        this._CostosDespidos = value;
    }


    public get DespidosTrabajadores(): number {
        return this._DespidosTrabajadores;
    }
    public set DespidosTrabajadores(value: number) {
        this._DespidosTrabajadores = value;
    }

    public get CostosContratacion(): number {
        return this._CostosContratacion;
    }
    public set CostosContratacion(value: number) {
        this._CostosContratacion = value;
    }

    public get NuevosTrabajadoresContractados(): number {
        return this._NuevosTrabajadoresContratados;
    }
    public set NuevosTrabajadoresContractados(value: number) {
        this._NuevosTrabajadoresContratados = value;
    }

    public get TrabajadoresReq(): number {
        return this._TrabajadoresReq;
    }
    public set TrabajadoresReq(value: number) {
        this._TrabajadoresReq = value;
    }

    public get HorasMesXTrabajador(): number {
        return this._HorasMesXTrabajador;
    }
    public set HorasMesXTrabajador(value: number) {
        this._HorasMesXTrabajador = value;
    }

    public get DiasHabiles(): number {
        return this._DiasHabiles;
    }
    public set DiasHabiles(value: number) {
        this._DiasHabiles = value;
    }

    public get HorasProduccionReq(): number {
        return this._HorasProduccionReq;
    }
    public set HorasProduccionReq(value: number) {
        this._HorasProduccionReq = value;
    }
    public get RequerimientoProducccion(): number {
        return this._RequerimientoProducccion;
    }
    public set RequerimientoProducccion(value: number) {
        this._RequerimientoProducccion = value;
    }


}