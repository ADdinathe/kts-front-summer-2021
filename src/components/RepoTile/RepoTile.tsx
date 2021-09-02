import "./RepoTile.css"
import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import {RepoItem} from "../../store/GitHubStore/types";


type RepoTileProps = {
    item: RepoItem;
    _onClick: (it: RepoItem) => void;

}


const RepoTile: React.FC<RepoTileProps> = ({item, _onClick}) => {
    const onClick = (e: React.MouseEvent) => {
        _onClick(item);

    }
    return (<div className="git-repo-tile" onClick={onClick}>
            <Avatar src={item.avatar_url} letter={item.name.charAt(0).toUpperCase()}/>
            <div className="git-repo-tile-content">
                <span className="git-repo-tile-content__rep-name">{item.name}</span>
                <span className="git-repo-tile-content__org-name">{item.owner}</span>
                <StarIcon/>
                <span className="git-repo-tile-content__star-number">{item.stargazers_count}</span>
                <span className="git-repo-tile-content__updated">{item.updated}</span>

            </div>
        </div>
    )
};

export default RepoTile;
