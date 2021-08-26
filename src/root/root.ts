import GitHubStore from "../store/GitHubStore/GitHubStore";
import {RepoItem} from "../store/GitHubStore/types";
import {ApiResponse} from "../shared/store/ApiStore/types";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

gitHubStore.GetOrganizationReposListParams(
    {
        organizationName: EXAMPLE_ORGANIZATION
    }).then((result: ApiResponse<RepoItem[], any>) => {
        console.log(result);
})
