import avatarStyle from "./Avatar.module.scss"
import React from "react";


type AvatarProps = {
    src?: string;
    letter: string;
    alt?: string;
}


const Avatar: React.FC<AvatarProps> = ({src, letter, alt}) => {
    if (src == null) {
        return <div className={avatarStyle.gitRepoTile__avatar}> {letter}</div>;
    }
    return <img className={avatarStyle.gitRepoTile__avatarImg} src={src} alt={alt}/>;
};

export default React.memo(Avatar);
