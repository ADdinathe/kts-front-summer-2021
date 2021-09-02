import {ApiResponse} from "../../shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type GetOrganizationBranchesListParams = {
    owner: string;
    repo: string
}

export type BranchesItem = {

    name: string;
    sha: string;
    url: string;
    protected: boolean;


};

export type RepoItem = {
    id: number;
    name: string;
    stargazers_count: number;
    owner_id: number;
    url: string;
    avatar_url: string;
    owner: string;
    updated: string;


};

/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */
export interface IGitHubStore {
    GetOrganizationReposListParams(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}
