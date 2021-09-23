import ApiStore from "../../shared/store/ApiStore";

import { HTTPMethod } from "../../shared/store/ApiStore/types";
import { GetOrganizationBranchesListParams } from "./types";
import { Meta } from "@utils/meta";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import {
  BranchesItemApi,
  BranchesItemModel,
  normalizeBranchesItem,
} from "../../models/gitHub";
import { ILocalStore } from "@utils/useLocalStore/useLocalStore";

const BASE_URL = "https://api.github.com/";

type PrivateFields = "_meta" | "_branch";

export default class RepoBranchesStore implements ILocalStore {
  private readonly ApiStore: ApiStore = new ApiStore(BASE_URL);

  private _branch: BranchesItemModel[] = [];
  private _meta: Meta = Meta.initial;


  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branch: observable,
      _meta: observable,
      meta: computed,
      GetOrganizationBranchesListParams: action
    });
  }

  get branch(): BranchesItemModel[] {
    return this._branch;
  }

  get meta(): Meta {
    return this._meta;
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

  destroy() : void{

  }
}
