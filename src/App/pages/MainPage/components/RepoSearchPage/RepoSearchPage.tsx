import Input from "@components/Input";
import Button from "@components/Button";
import SearchIcon from "@components/SeacrhIcon";
import RepoTile from "@components/RepoTile";
import React, { useState, createContext, useContext } from "react";
import GitHubStore from "../../../../../store/GitHubStore";
import {RepoItem} from "../../../../../store/GitHubStore/types";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import {Link , Route} from 'react-router-dom';

import searchPageStyles from "./RepoSearchPage.module.scss";

const RepoContext = createContext< {
    repoList: RepoItem[],
    isLoading: boolean,
    setisLoading: (load: boolean) => void
}>(
  {
    repoList: [],
    isLoading: false,
    setisLoading: () => {}
}
);

const Provider = RepoContext.Provider;

const RepoSearchPage = () => {
    const [value, setValue] = useState<string>("")
    const gitHubStore = new GitHubStore();
    const [visible, setVisible] = useState<boolean>(false);
    const [repoList, setrepoList] = useState<RepoItem[]>([])
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [repo, setRepo] = useState<RepoItem | null>(null);




    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);

    }
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const handleClick = () => {
        setisLoading(true);
        gitHubStore.GetOrganizationReposListParams({organizationName: value}).then((result) => {

            if (result.success) {
                setrepoList(result.data);
            } else {
                //alert("nothing");
            }
            setisLoading(false);
        })

    }

    const handleRepoClicked = (it: RepoItem) => {

        showDrawer();
        setRepo(it);
    }

    const RepoBranchesDrawerShower = () =>{
        return(
          <RepoBranchesDrawer selectedRepo={repo} onClose={onClose} visible={visible}/>
        )
    }

    return (

      <Provider value={{
          repoList, isLoading , setisLoading
      }
      }>
          <div className={searchPageStyles.mainBlock}>
              <div className={searchPageStyles.searchBar}>
                  <Input value={value} onChange={handleChange} disabled={isLoading}
                         placeholder={"Введите название организации"}/>
                  <Button onClick={handleClick} disabled={isLoading}><SearchIcon/></Button>
              </div>

              {repoList.map((it) => (
                <Link to={`/repos/${it.id}`} key={it.id}>
                    {<RepoTile  item={it} _onClick={handleRepoClicked}/>}</Link>


              ))

              }
              <Route path="/repos/:id" component={RepoBranchesDrawerShower} />


          </div>
      </Provider>




    );

};

export default RepoSearchPage;