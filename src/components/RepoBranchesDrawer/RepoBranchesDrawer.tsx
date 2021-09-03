import "./RepoBranchesDrawer.css"
import React, {useEffect} from 'react';
import {Drawer} from 'antd';
import 'antd/dist/antd.css'
import {BranchesItem, RepoItem} from "../../store/GitHubStore/types";
import GitHubStore from "../../store/GitHubStore";

const gitHubStore = new GitHubStore();

type RepoSearchPageProps = {
    selectedRepo: RepoItem | null,
    onClose: () => void,
    visible: boolean
}

const RepoBranchesDrawer: React.FC<RepoSearchPageProps> = ({selectedRepo, onClose, visible}) => {
    const [repoList, setRepoList] = React.useState([] as BranchesItem[])
        React.useEffect(() => {
        if (selectedRepo != null){
            gitHubStore.GetOrganizationBranchesListParams({owner: selectedRepo.owner, repo: selectedRepo.name}).then((result) => {
                if (result.success) {
                    setRepoList(result.data);
                } else {
                    alert("nothing");
                }
            });
    }})

        return (
            <>
                <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                    {repoList.map((it) => (
                        <div key={it.sha}>
                            <p>{it.name}</p>
                            <p>{it.url}</p>
                            <p>{it.protected}</p>
                        </div>
                    ))

                    }
                </Drawer>
            </>
        );

};

export default RepoBranchesDrawer;