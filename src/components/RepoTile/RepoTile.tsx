import tileStyle from "./RepoTile.module.scss";
import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import {RepoItem} from "../../store/GitHubStore/types";
import React from "react";


type RepoTileProps = {
    item: RepoItem;
    _onClick: (it: RepoItem) => void;

}


const RepoTile: React.FC<RepoTileProps> = ({item, _onClick}) => {
    const onClick = (e: React.MouseEvent) => {
        _onClick(item);

    }
    return (<div className={tileStyle.gitRepoTile} onClick={onClick}>
            <Avatar src={item.avatar_url} letter={item.name.charAt(0).toUpperCase()}/>
            <div className={tileStyle.gitRepoTileContent}>
                <span className={tileStyle.gitRepoTileContent__repName}>{item.name}</span>
                <span className={tileStyle.gitRepoTileContent__orgName}>{item.owner}</span>
                <StarIcon/>
                <span className={tileStyle.gitRepoTileContent__starNumber}>{item.stargazers_count}</span>
                <span className={tileStyle.gitRepoTileContent__updated}>{item.updated}</span>

            </div>
        </div>
    )
};

export default React.memo(RepoTile);
