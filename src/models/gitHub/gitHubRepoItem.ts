import { normalizeRepoOwner, RepoOwnerApi, RepoOwnerModel } from "./gitHubRepoOwner";
import dayjs from "dayjs";

export type RepoItemApi = {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
  owner: RepoOwnerApi,
};
export type RepoItemModel = {
  id: number;
  name: string;
  stargazersCount: number;
  updated: string;
  owner: RepoOwnerModel,
};
export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  stargazersCount: from.stargazers_count,
  updated: `Updated ${dayjs(from.updated_at).format("DD MMM")}`,
  owner: normalizeRepoOwner(from.owner)
});