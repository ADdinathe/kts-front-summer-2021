import { RepoItemApi, RepoItemModel } from "./gitHubRepoItem";
import { BranchesCommitApi, BranchesCommitModel, normalizeBranchesCommit } from "./gitHubBranchesCommit";
import { normalizeRepoOwner } from "./gitHubRepoOwner";

export type BranchesItemApi = {
  name: string;
  commit:BranchesCommitApi,
};

export type BranchesItemModel = {
  name: string;
  commit:BranchesCommitModel,
};

export const normalizeBranchesItem = (from: BranchesItemApi): BranchesItemModel =>({
  name: from.name,
  commit: normalizeBranchesCommit(from.commit),
})