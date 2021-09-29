import ApiStore from "../../shared/store/ApiStore";
// import  "../../models/shared/collection";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "../../models/shared/collection";
import {HTTPMethod} from "../../shared/store/ApiStore/types";
import {GetOrganizationReposListParams} from "./types";
import {Meta} from "utils/meta";
import {action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction} from "mobx";
import {
    normalizeRepoItem,
    RepoItemApi,
    RepoItemModel
} from "../../models/gitHub";
import {ILocalStore} from "utils/useLocalStore/useLocalStore";
import rootStore from "../RootStore";

const BASE_URL = "https://api.github.com/";

type PrivateFields = "_list" | "_meta";


export default class ReposListStore implements ILocalStore {
    private readonly ApiStore = new ApiStore<RepoItemApi[]>(BASE_URL);

    private _list: CollectionModel<number, RepoItemModel> = getInitialCollectionModel();

    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ReposListStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            GetOrganizationReposListParams: action,
        });
    }

    get list(): RepoItemModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    async GetOrganizationReposListParams(params: GetOrganizationReposListParams): Promise<void> {

        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        const result = await this.ApiStore.request({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `orgs/${params.organizationName}/repos`
        });

        runInAction(() => {
            if (this.ApiStore.success) {
                try {
                    this._meta = Meta.success;
                    this._list = normalizeCollection(this.ApiStore.data.map(normalizeRepoItem), (listItem) => listItem.id);
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

    private readonly _qpReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam("search"),
        (search) => {
            console.log(search);
        }
    )
}
