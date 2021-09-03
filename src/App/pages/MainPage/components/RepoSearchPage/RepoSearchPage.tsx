import "./RepoSearchPage.css"
import Input from "@components/Input";
import Button from "@components/Button";
import SearchIcon from "@components/SeacrhIcon";
import RepoTile from "@components/RepoTile";
import React, {useState} from "react";
import GitHubStore from "../../../../../store/GitHubStore";
import {RepoItem} from "../../../../../store/GitHubStore/types";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import set = Reflect.set;


const RepoSearchPage = () => {
    const [value, setValue] = useState("")
    const gitHubStore = new GitHubStore();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([] as RepoItem[])
    const [load, setLoad] = useState(false);
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
        setLoad(true);
        gitHubStore.GetOrganizationReposListParams({organizationName: value}).then((result) => {

            if (result.success) {
                setData(result.data);
            } else {
                //alert("nothing");
            }
            setLoad(false);
        })

    }

    const handleRepoClicked = (it: RepoItem) => {
        //console.log(it.name, it.owner);
        showDrawer();
        setRepo(it);
    }

    return (

        <div className="main-block">
            <div className="search-bar">
                <Input value={value} onChange={handleChange} disabled={load}
                       placeholder={"Введите название организации"}/>
                <Button onClick={handleClick} disabled={load}><SearchIcon/></Button>
            </div>

            {data.map((it) => (

                <RepoTile key={it.id} item={it} _onClick={handleRepoClicked}/>
            ))

            }
            <RepoBranchesDrawer selectedRepo={repo} onClose={onClose} visible={visible}/>

        </div>
    );

};

export default RepoSearchPage;