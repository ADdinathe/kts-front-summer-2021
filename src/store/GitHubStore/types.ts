import {ApiResponse} from "../../shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type GetOrganizationBranchesListParams = {

    id: string;
    // owner: string;
    // repo: string
}


/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */
export interface IGitHubStore {
    GetOrganizationReposListParams(params: GetOrganizationReposListParams): Promise<void>;
}
