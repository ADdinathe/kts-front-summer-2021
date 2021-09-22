export type RepoItemApi = {
  id: number;
  name: string;
  stargazers_count: number;
  owner_id: number;
  url: string;
  avatar_url: string;
  owner: string;
  updated: string;
};


export type RepoItemModel = {
  id: number;
  name: string;
  stargazersCount: number;
  ownerId: number;
  url: string;
  avatarUrl: string;
  owner: string;
  updated: string;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel =>({
  id: from.id,
  name: from.name,
  stargazersCount: from.stargazers_count,
  ownerId: from.owner_id,
  url: from.url,
  avatarUrl: from.avatar_url,
  owner: from.owner,
  updated: from.updated,
})