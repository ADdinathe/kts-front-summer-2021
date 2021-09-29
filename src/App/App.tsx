import 'styles/App.scss';
import MainPage from "./pages/MainPage";
import {useQueryParamsStoreInit} from "../store/hooks/useQueryParamsStoreInit";
import React from 'react';


function App() {
    useQueryParamsStoreInit();
    return <MainPage/>
}

export default App;