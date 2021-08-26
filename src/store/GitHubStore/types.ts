import {ApiResponse} from "../../shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type GitHubRepoOwner ={
    id: number;
    url: string;
    avatar_url: string;
    login: string;
}

export type RepoItem = {
    id: number;
    url: string;
    name: string;
    stargazers_count: number;
    owner: GitHubRepoOwner;


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
