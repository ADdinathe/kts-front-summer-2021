import * as Router from "react-router-dom";

import rootStore from "../RootStore/instance";

export const useQueryParamsStoreInit = (): void => {
    const {search} = Router.useLocation();

    rootStore.query.setSearch(search);
};