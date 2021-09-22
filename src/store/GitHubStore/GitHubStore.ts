import ApiStore from "../../shared/store/ApiStore";
import { HTTPMethod } from "../../shared/store/ApiStore/types";
import { GetOrganizationBranchesListParams, GetOrganizationReposListParams, IGitHubStore } from "./types";
import { Meta } from "@utils/meta";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import dayjs from "dayjs";
import {
  BranchesItemApi,
  BranchesItemModel,
  normalizeBranchesItem,
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel
} from "../../models/gitHub";

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
      _branch: observable.ref,
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
    const date = result.data;
    const array = [] as RepoItemApi[];
    runInAction(() => {
      if (result.success) {
        try {
          this._meta = Meta.success;
          for (let repo_info of date) {
            array.push({
              id: repo_info.id,
              name: repo_info.name,
              stargazers_count: repo_info.stargazers_count,
              owner_id: repo_info.owner.id,
              url: repo_info.owner.url,
              avatar_url: repo_info.owner.avatar_url,
              owner: repo_info.owner.login,
              updated: `Updated ${dayjs(repo_info.pushed_at).format("DD MMM")}`
            });
          }
          for (let rero of array) {
            this._list.push(normalizeRepoItem(rero));
          }
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

    const result = await this.ApiStore.request<BranchesItemApi>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `repositories/${params.id}/branches`
    });

    const date = result.data;
    const array = [] as BranchesItemApi[];

    runInAction(() => {
      if (result.success) {
        try {
          for (let branch_info of date) {
            array.push({
              name: branch_info.name,
              sha: branch_info.commit.sha,
              url: branch_info.commit.url,
              protected: branch_info.protected
            });
          }
          for (let rero of array) {
            this._branch.push(normalizeBranchesItem(rero));
          }
        } catch (e) {
          this._meta = Meta.error;
        }
      } else {
        this._meta = Meta.error;
      }
    });
  }
}
