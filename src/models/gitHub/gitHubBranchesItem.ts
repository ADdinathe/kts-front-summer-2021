import { RepoItemApi, RepoItemModel } from "./gitHubRepoItem";

export type BranchesItemApi = {

  name: string;
  sha: string;
  url: string;
  protected: boolean;


};

export type BranchesItemModel = {

  name: string;
  sha: string;
  url: string;
  protected: boolean;


};

export const normalizeBranchesItem = (from: BranchesItemApi): BranchesItemModel =>({
  name: from.name,
  sha: from.sha,
  url: from.url,
  protected: from.protected,

})