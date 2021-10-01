export type BranchesCommitApi = {
  sha: string;
  url: string;
};

export type  BranchesCommitModel = {
  sha: string;
  url: string;
};

export const normalizeBranchesCommit = (from: BranchesCommitApi): BranchesCommitModel =>({
  sha: from.sha,
  url: from.url,
})