import ApiStore from "../../shared/store/ApiStore";
import { HTTPMethod } from "../../shared/store/ApiStore/types";
import { GetOrganizationBranchesListParams, GetOrganizationReposListParams, IGitHubStore } from "./types";
import { Meta } from "@utils/meta";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import {
  BranchesItemApi,
  BranchesItemModel,
  normalizeBranchesItem,
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel
} from "../../models/gitHub";
import * as constants from "constants";

const BASE_URL = "https://api.github.com/";

type PrivateFields = "_list" | "_meta" | "_branch";

export default class GitHubStore implements IGitHubStore {
  private readonly ApiStore: ApiStore = new ApiStore(BASE_URL);

  private _list: RepoItemModel[] = [];
  private _branch: BranchesItemModel[] = [];
  private _meta: Meta = Meta.initial;


  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _branch: observable,
      _meta: observable,
      list: computed,
      meta: computed,
      GetOrganizationReposListParams: action,
      GetOrganizationBranchesListParams: action
    });
  }

  get list(): RepoItemModel[] {
    return this._list;
  }

  get branch(): BranchesItemModel[] {
    return this._branch;
  }

  get meta(): Meta {
    return this._meta;
  }


  async GetOrganizationReposListParams(params: GetOrganizationReposListParams): Promise<void> {

    this._meta = Meta.loading;
    this._list = [];

    const result = await this.ApiStore.request<RepoItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `orgs/${params.organizationName}/repos`
    });

    runInAction(() => {
      if (result.success) {
        try {
          this._meta = Meta.success;
          this._list=result.data.map(normalizeRepoItem)
          // result.data.forEach((element) => {
          //   this._list.push(normalizeRepoItem(element));
          // });
        } catch (e) {
          this._meta = Meta.error;
        }
      } else {
        this._meta = Meta.error;
      }
    });
  }


  async GetOrganizationBranchesListParams(params: GetOrganizationBranchesListParams): Promise<void> {
    this._meta = Meta.loading;
    this._branch = [];

    const result = await this.ApiStore.request<BranchesItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `repositories/${params.id}/branches`
    });

    runInAction(() => {
      if (result.success) {
        try {
          this._branch=result.data.map(normalizeBranchesItem);
          console.log(this._branch);

        } catch (e) {
          this._meta = Meta.error;
        }
      } else {
        this._meta = Meta.error;
      }
    });
  }
}
