import "./RepoBranchesDrawer.css"
import React from 'react';
import {Drawer} from 'antd';
import 'antd/dist/antd.css'
import {BranchesItem} from "../../store/GitHubStore/types";


type RepoSearchPageProps = {
    selectedRepo: BranchesItem [] | null,
    onClose: () => void,
    visible: boolean
}

const RepoBranchesDrawer: React.FC<RepoSearchPageProps> = ({selectedRepo, onClose, visible}) => {
    if (selectedRepo !== null) {
        return (
            <>
                <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                    {selectedRepo.map((it) => (
                        <div key={it.sha}>
                            <p>{it.name}</p>
                            <p>{it.url}</p>
                            <p>{it.protected}</p>
                        </div>
                    ))

                    }
                </Drawer>
            </>
        );
    }
    return null;
};

export default RepoBranchesDrawer;