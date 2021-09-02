import "./Avatar.css"
import React from "react";


type AvatarProps = {
    src?: string;
    letter: string;
    alt?: string;
}


const Avatar: React.FC<AvatarProps> = ({src, letter, alt}) => {
    if (src == null) {
        return <div className="git-repo-tile__avatar"> {letter}</div>;
    }
    return <img className="git-repo-tile__avatar" src={src} alt={alt}/>;
};

export default React.memo(Avatar);
