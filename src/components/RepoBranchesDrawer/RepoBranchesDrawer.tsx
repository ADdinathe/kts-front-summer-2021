import React from "react";
import { Drawer } from "antd";
import "antd/dist/antd.css";
// import { BranchesItem, RepoItem } from "../../store/RepoBranches/types";
import RepoBranchesStore from "../../store/RepoBranchesStore/RepoBranchesStore";
import { useParams } from "react-router-dom";
import drawerStyles from "./RepoBranchesDrawer.module.scss";
import { RepoItemModel } from "../../models/gitHub";
import { observer, useLocalObservable } from "mobx-react";



type RepoSearchPageProps = {
  selectedRepo: RepoItemModel | null,
  onClose: () => void,
  visible: boolean
}
const RepoBranchesDrawer: React.FC<RepoSearchPageProps> = ({ selectedRepo, onClose, visible }) => {
  // const RepoBranchesStore = useLocalObservable(() => new RepoBranchesStore());
  const RepoBranches = useLocalObservable(() => new RepoBranchesStore())
  // const [repoList, setRepoList] = React.useState<BranchesItemModel[]>([]);
  const { id } = useParams<{ id: string }>();

   React.useEffect(() => {
    if (id !== undefined) {
      RepoBranches.GetOrganizationBranchesListParams({ id });

    }
  }, [id, RepoBranches]);

  return (
    <>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        {RepoBranches.branch.map((it) => (
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