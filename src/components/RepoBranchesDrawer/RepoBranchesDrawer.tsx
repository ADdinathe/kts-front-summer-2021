import React from "react";
import {Drawer} from "antd";
import "antd/dist/antd.css";
import RepoBranchesStore from "../../store/RepoBranchesStore/RepoBranchesStore";
import {useParams} from "react-router-dom";
import drawerStyles from "./RepoBranchesDrawer.module.scss";
import {observer, useLocalObservable} from "mobx-react";

//adifjvbhaiefhbva
type RepoSearchPageProps = {
    onClose: () => void
}
const RepoBranchesDrawer: React.FC<RepoSearchPageProps> = ({onClose}) => {
    const RepoBranches = useLocalObservable(() => new RepoBranchesStore())
    const {id} = useParams<{ id: string }>();

    React.useEffect(() => {
        if (id !== undefined) {
            RepoBranches.GetOrganizationBranchesListParams({id});

        }
    }, [id, RepoBranches]);

    return (
        <>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={true}>
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