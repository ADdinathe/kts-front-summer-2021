import 'styles/App.scss';
import MainPage from "./pages/MainPage";
import {useQueryParamsStoreInit} from "../store/hooks/useQueryParamsStoreInit";
import React from 'react';
import 'react-dom'


function App() {
    // useQueryParamsStoreInit();
    return <MainPage/>
}

export default App;