import React from "react";
import { Drawer } from "antd";
import "antd/dist/antd.css";
// import { BranchesItem, RepoItem } from "../../store/GitHubStore/types";
import GitHubStore from "../../store/GitHubStore";
import { useParams } from "react-router-dom";
import drawerStyles from "./RepoBranchesDrawer.module.scss";
import { BranchesItemModel, RepoItemModel } from "../../models/gitHub";
import { observer, useLocalObservable } from "mobx-react";




type RepoSearchPageProps = {
  selectedRepo: RepoItemModel | null,
  onClose: () => void,
  visible: boolean
}

const RepoBranchesDrawer: React.FC<RepoSearchPageProps> = ({ selectedRepo, onClose, visible }) => {
  const gitHubStore = useLocalObservable(() => new GitHubStore());
  const [repoList, setRepoList] = React.useState<BranchesItemModel[]>([]);
  const { id } = useParams<{ id: string }>();

   React.useEffect(() => {
    if (id !== undefined) {
       const result = gitHubStore.GetOrganizationBranchesListParams({ id });
       console.log(0,gitHubStore.branch)
    }
  }, [id, gitHubStore]);
   console.log(1,gitHubStore.branch);
  return (
    <>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        {gitHubStore.branch.map((it) => (
          <div key={it.name}>
            <p className={drawerStyles.ItemName}>{it.name}</p>
            <p className={drawerStyles.ItemUrl}>{it.commit.url}</p>
            <p>{it.commit.sha}</p>
          </div>
        ))
        }
      </Drawer>
    </>
  );

};

export default observer(RepoBranchesDrawer);