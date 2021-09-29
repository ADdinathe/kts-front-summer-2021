import qs from 'qs';
import {ApiResponse, HTTPMethod, IApiStore, RequestParams, StatusHTTP} from "./types";
import {ILocalStore} from "utils/useLocalStore/useLocalStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";


type PrivateFields = "_success" | "_data" | "_status";

export default class ApiStore <SuccessT, ErrorT = any>implements ILocalStore {

    readonly baseUrl : string;
    private _success: boolean = false;
    private _data: SuccessT = {} as SuccessT;
    private _status: StatusHTTP | number = StatusHTTP.BAD_GATEWAY;
    constructor(url : string) {
        this.baseUrl = url;
        makeObservable<ApiStore<SuccessT, ErrorT>, PrivateFields>(this, {
            _success: observable.ref,
            _data: observable,
            _status: observable,
            success: computed,
            data: computed,
            status: computed,
            request: action
        });
    }

    get success(): boolean {
        return this._success;
    }

    get data(): SuccessT {

            return this._data;

    }

    get status(): StatusHTTP | number {
        return this._status;
    }

    private getRequestData<ReqT>(params: RequestParams<ReqT>): [string, RequestInit] {
        let endpoint = `${this.baseUrl}${params.endpoint}`;

        const req:RequestInit = {
            method: params.method,
            headers: {...params.headers}
        };

        if (params.method === HTTPMethod.GET) {
            endpoint = `${endpoint}?${qs.stringify(params.data)}`;
        }

        if (params.method === HTTPMethod.POST) {
            req.body = JSON.stringify(params.data);
            req.headers = {
                ...req.headers,
                // eslint-disable-next-line
                ['Content-Type']: 'application/json;charset=UTF-8'
            };
            }

        return [endpoint, req];
        }

    async request< ReqT = {}>(params: RequestParams<ReqT>): Promise<void> {
        try {
            const response = await fetch(...this.getRequestData(params));
             await runInAction(async () => {
                 if (response.ok) {

                     this._success = true;
                     this._data = await response.json();
                     this._status = response.status

                 } else {
                     this._success = false;
                     this._data = await response.json();
                     this._status = response.status
                 }
             })

        } catch (event){
             runInAction(() => {
                this._success= false;
                this._data= event as SuccessT;
                this._status=StatusHTTP.BAD_GATEWAY
            })

        }
    }

    destroy(): void {
    }
}