import "./MainPage.scss"
import React, { createContext, useState } from "react";
import RepoSearchPage from "./components/RepoSearchPage";
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import { RepoItem } from "../../../store/GitHubStore/types";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";

const RepoContext = createContext<{
  repoList: RepoItem[],
  isLoading: boolean,
  load: () => void
}>(
  {
    repoList: [],
    isLoading: false,
    load: () => {
    }
  }
);
const Provider = RepoContext.Provider;

const MainPage = () => {
    return(

        <BrowserRouter>
        <Route path="/repos" component={RepoSearchPage}/>
        <Redirect to="/repos" />
      </BrowserRouter>



    )
};

export default MainPage;