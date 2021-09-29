import Input from "components/Input";
import Button from "components/Button";
import SearchIcon from "components/SeacrhIcon";
import RepoTile from "components/RepoTile";
import React, { useState, createContext, useContext } from "react";
import ReposListStore from "../../../../../store/ReposListStore";
import RepoBranchesDrawer from "components/RepoBranchesDrawer";
import { Link, Route } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";
import searchPageStyles from "./RepoSearchPage.module.scss";
import { RepoItemModel } from "models/gitHub";
import {Meta} from "utils/meta";
import ErrorImage from "components/ErrorImage";
import LoadingSpin from "components/LoadingSpin";


const RepoSearchPage = () => {
  const [value, setValue] = useState<string>("");
  const gitHubStore = useLocalObservable(() => new ReposListStore());
  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  const handleClick = React.useCallback(() => {
    const getresult = async () => {
      try {
        await gitHubStore.GetOrganizationReposListParams({
          organizationName: value
        });
      } catch (e) {
        console.log(e);
      }
    };
    getresult();
  }, [value, gitHubStore]);

  const handleRepoClicked = React.useCallback((it: RepoItemModel) => {
    showDrawer();
  }, [showDrawer]);

  const RepoBranchesDrawerShower = () => {
    return (
      <RepoBranchesDrawer onClose={onClose} visible={visible} />
    );
  };

  return (



    <div className={searchPageStyles.mainBlock}>
      <div className={searchPageStyles.searchBar}>
        <Input value={value} onChange={handleChange} disabled={gitHubStore.meta}
               placeholder={"Введите название организации"} />
        <Button onClick={handleClick} disabled={gitHubStore.meta}><SearchIcon /></Button>
      </div>

      {gitHubStore.meta === Meta.error && <ErrorImage />}
      {gitHubStore.meta === Meta.loading && <LoadingSpin />}
      {gitHubStore.meta !== (Meta.loading || Meta.error) &&
          <>
            {gitHubStore.list.map((it) => (
              <RepoTile item={it} key={it.id} _onClick={handleRepoClicked} loading={gitHubStore.meta} />
          ))}
          </>

      }
      <Route path="/repos/:id" component={RepoBranchesDrawerShower} />
    </div>


  );

};


export default observer(RepoSearchPage);