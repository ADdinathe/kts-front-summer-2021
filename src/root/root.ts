import GitHubStore from "../store/GitHubStore/GitHubStore";

export default class Main {
    private GitHubStore: GitHubStore = new GitHubStore();

    Main () {
        this.GitHubStore.getSomeData({company_name: 'adobe'}).then((result) => {
            console.log(result.data);
        })
    }
}