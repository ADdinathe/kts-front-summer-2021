import "./MainPage.scss"
import React from "react";
import RepoSearchPage from "./components/RepoSearchPage";
import { BrowserRouter, Route, Redirect} from "react-router-dom";



const MainPage = () => {
    return(
        <BrowserRouter>
            <Route path="/repos" component={RepoSearchPage}/>

            <Redirect to="/repos" />
        </BrowserRouter>

    )
};

export default MainPage;