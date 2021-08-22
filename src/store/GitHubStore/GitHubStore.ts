import {ApiResp, GetSomeDataParams, GetSomeDataResp, IGitHubStore} from "./types";
import ApiStore from "../../shared/store/ApiStore";

export default class GitHubStore implements IGitHubStore {
    private readonly ApiStore: ApiStore = new ApiStore('https://api.github.com/');

    async getSomeData(params: GetSomeDataParams): Promise<ApiResp<GetSomeDataResp>> {
        const result = await this.ApiStore.request<GetSomeDataResp>({
            data: {},
            endpoint: `orgs/${params.company_name}/repos`,
            headers: {},
            method: 0
        })
        const data = await result.data;
        return {
            success: true,
            data: data as GetSomeDataResp
        }
    }
}
