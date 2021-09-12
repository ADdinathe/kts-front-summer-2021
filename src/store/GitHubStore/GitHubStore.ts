import ApiStore from "../../shared/store/ApiStore";
import dayjs from 'dayjs';
import {ApiResponse, HTTPMethod} from "../../shared/store/ApiStore/types";
import {
    GetOrganizationReposListParams,
    IGitHubStore,
    RepoItem,
    GetOrganizationBranchesListParams,
    BranchesItem
} from "./types";

const BASE_URL = 'https://api.github.com/';

export default class GitHubStore implements IGitHubStore {
    private readonly ApiStore: ApiStore = new ApiStore(BASE_URL);

    async GetOrganizationReposListParams(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>> {
        const result = await this.ApiStore.request({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `orgs/${params.organizationName}/repos`
        });
        const date = result.data;
        const array = [];
        if (result.success) {
            for (let repo_info of date) {
                array.push({
                    id: repo_info.id,
                    name: repo_info.name,
                    stargazers_count: repo_info.stargazers_count,
                    owner_id: repo_info.owner.id,
                    url: repo_info.owner.url,
                    avatar_url: repo_info.owner.avatar_url,
                    owner: repo_info.owner.login,
                    updated: `Updated ${dayjs(repo_info.pushed_at).format("DD MMM")}`
                });
            }
            return {
                success: true,
                status: result.status,
                data: array
            }
        }
        return result;
    }


    async GetOrganizationBranchesListParams(params: GetOrganizationBranchesListParams): Promise<ApiResponse<BranchesItem[], any>> {
        const result = await this.ApiStore.request({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `repositories/${params.id}/branches`
        });
        const date = result.data;
        const array = [];
        if (result.success) {
            for (let branch of date) {
                array.push({
                    name: branch.name,
                    sha: branch.commit.sha,
                    url: branch.commit.url,
                    protected: branch.protected
                });
            }
            return {
                success: true,
                status: result.status,
                data: array
            }
        }
        return result;
    }
}
