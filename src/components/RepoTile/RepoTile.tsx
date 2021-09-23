import tileStyle from "./RepoTile.module.scss";
import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
// import {RepoItem} from "../../store/ReposListStore/types";
import React from "react";
import { Link } from "react-router-dom";
import { RepoItemModel } from "../../models/gitHub";


type RepoTileProps = {
    item: RepoItemModel;
    _onClick: (it: RepoItemModel) => void;

}


const RepoTile: React.FC<RepoTileProps> = ({item, _onClick}) => {
    const onClick = (e: React.MouseEvent) => {
        _onClick(item);

    }
    return (<Link to={`/repos/${item.id}`} >{<div className={tileStyle.gitRepoTile} onClick={onClick}>
        <Avatar src={item.owner.avatarUrl} letter={item.name.charAt(0).toUpperCase()}/>
        <div className={tileStyle.gitRepoTileContent}>
            <span className={tileStyle.gitRepoTileContent__repName}>{item.name}</span>
            <span className={tileStyle.gitRepoTileContent__orgName}>{item.owner.login}</span>
            <StarIcon/>
            <span className={tileStyle.gitRepoTileContent__starNumber}>{item.stargazersCount}</span>
            <span className={tileStyle.gitRepoTileContent__updated}>{item.updated}</span>

        </div>
    </div>}</Link>

    )
};

export default React.memo(RepoTile);
