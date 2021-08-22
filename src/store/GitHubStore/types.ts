/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

enum HTTPMethod {
    GET,
    POST
}

export type GetSomeDataParams = {
    company_name: string;
}

export type PostSomeDataParams = {
    company_name: string;
}

export type GetSomeDataResp = {
    company_name: string;
}

export type PostSomeDataResp = {
    company_name: string;
}

export type ApiResp<GetSomeDataResp> = {
    success: true;
    data: GetSomeDataResp;
}

export interface IGitHubStore {
    getSomeData(params: GetSomeDataParams): Promise<ApiResp<GetSomeDataResp>>;

    // Необязательный пункт, т.к. требует авторизации. Понадобится в будущем
   // postSomeData(params: PostSomeDataParams): Promise<ApiResp<PostSomeDataResp>>;
}
