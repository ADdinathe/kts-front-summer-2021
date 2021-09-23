import Input from "@components/Input";
import Button from "@components/Button";
import SearchIcon from "@components/SeacrhIcon";
import RepoTile from "@components/RepoTile";
import React, { useState, createContext, useContext } from "react";
import ReposListStore from "../../../../../store/ReposListStore";
// import { RepoItem } from "../../../../../store/ReposListStore/types";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import { Link, Route } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";

import searchPageStyles from "./RepoSearchPage.module.scss";
import { RepoItemModel } from "../../../../../models/gitHub";


const RepoSearchPage = () => {
  const [value, setValue] = useState<string>("");
  const gitHubStore = useLocalObservable(() => new ReposListStore());
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [repo, setRepo] = useState<RepoItemModel | null>(null);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = () => {
      setisLoading(true);
    gitHubStore.GetOrganizationReposListParams({ organizationName: value }).then((result) => {
      setisLoading(false);
    });
  };

  const handleRepoClicked = (it: RepoItemModel) => {
    showDrawer();
  };

  const RepoBranchesDrawerShower = () => {
    return (
      <RepoBranchesDrawer selectedRepo={repo} onClose={onClose} visible={visible} />
    );
  };

  return (


    <div className={searchPageStyles.mainBlock}>
      <div className={searchPageStyles.searchBar}>
        <Input value={value} onChange={handleChange} disabled={isLoading}
               placeholder={"Введите название организации"} />
        <Button onClick={handleClick} disabled={isLoading}><SearchIcon /></Button>
      </div>

      {gitHubStore.list.map((it) => (
        <RepoTile item={it} key={it.id} _onClick={handleRepoClicked} />
      ))}

      <Route path="/repos/:id" component={RepoBranchesDrawerShower} />

    </div>


  );

};

export default observer(RepoSearchPage);