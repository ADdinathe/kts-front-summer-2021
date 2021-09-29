import React from "react";
import { Drawer } from "antd";
import "antd/dist/antd.css";
import { BranchesItem, RepoItem } from "../../store/GitHubStore/types";
import GitHubStore from "../../store/GitHubStore";
import { useParams } from "react-router-dom";

import drawerStyles from "./RepoBranchesDrawer.module.scss";


const gitHubStore = new GitHubStore();

type RepoSearchPageProps = {
  selectedRepo: RepoItem | null,
  onClose: () => void,
  visible: boolean
}

const RepoBranchesDrawer: React.FC<RepoSearchPageProps> = ({ selectedRepo, onClose, visible }) => {

  const [repoList, setRepoList] = React.useState<BranchesItem[]>([]);
  const { id } = useParams<{ id: string }>();


   React.useEffect(() => {

    if (id !== undefined) {
        gitHubStore.GetOrganizationBranchesListParams({ id }).then((result) => {
        if (result.success) {
          setRepoList(result.data);
        } else {
          setRepoList(result.data);
        }
      });
    }
  }, [id]);

  return (
    <>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        {repoList.map((it) => (
          <div key={it.name}>
            <p className={drawerStyles.ItemName}>{it.name}</p>
            <p className={drawerStyles.ItemUrl}>{it.url}</p>
            <p>{it.protected}</p>
          </div>
        ))

        }
      </Drawer>
    </>
  );

};

export default RepoBranchesDrawer;