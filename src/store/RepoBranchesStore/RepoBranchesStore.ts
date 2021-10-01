import ApiStore from "../../shared/store/ApiStore";

import {HTTPMethod} from "../../shared/store/ApiStore/types";
import {GetOrganizationBranchesListParams} from "./types";
import {Meta} from "utils/meta";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {
    BranchesItemApi,
    BranchesItemModel,
    normalizeBranchesItem, RepoItemApi
} from "../../models/gitHub";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "../../models/shared/collection";

import {ILocalStore} from "utils/useLocalStore/useLocalStore";

const BASE_URL = "https://api.github.com/";

type PrivateFields = "_meta" | "_branch";

export default class RepoBranchesStore implements ILocalStore {
    private readonly ApiStore = new ApiStore<BranchesItemApi[]>(BASE_URL);


    private _branch: CollectionModel<string, BranchesItemModel> = getInitialCollectionModel();

    private _meta: Meta = Meta.initial;


    constructor() {
        makeObservable<RepoBranchesStore, PrivateFields>(this, {
            _branch: observable.ref,
            _meta: observable,
            meta: computed,
            branch: computed,
            GetOrganizationBranchesListParams: action
        });
    }

    get branch(): BranchesItemModel[] {
        return linearizeCollection(this._branch);
    }


    get meta(): Meta {
        return this._meta;
    }

    async GetOrganizationBranchesListParams(params: GetOrganizationBranchesListParams): Promise<void> {
        this._meta = Meta.loading;
        this._branch = getInitialCollectionModel();

        const result = await this.ApiStore.request({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `repositories/${params.id}/branches`
        });

        runInAction(() => {
            if (this.ApiStore.success) {
                try {
                    // this._branch=result.data.map(normalizeBranchesItem);
                    this._branch = normalizeCollection(this.ApiStore.data.map(normalizeBranchesItem), (listItem) => listItem.name);
                } catch (e) {
                    this._meta = Meta.error;
                }
            } else {
                this._meta = Meta.error;
            }
        });
    }

    destroy(): void {

    }
}
