export type RepoOwnerApi = {
  id: number;
  url: string;
  avatar_url: string;
  login: string;

};
export type  RepoOwnerModel = {
  id: number;
  url: string;
  avatarUrl: string;
  login: string;
};

export const normalizeRepoOwner = (from: RepoOwnerApi): RepoOwnerModel =>({
  id: from.id,
  url: from.url,
  avatarUrl: from.avatar_url,
  login: from.login,
})