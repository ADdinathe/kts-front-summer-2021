import "./Button.css"
import React from "react";


type ButtonProps = {
    children?: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    disabled: boolean;
}


const Button: React.FC<ButtonProps> = ({children, onClick, disabled}) => {
    if (disabled) {
        return <button className="search-bar__button" onClick={onClick} type="submit"
                       disabled={true}>{children}</button>;
    }
    return <button className="search-bar__button" onClick={onClick} type="submit">{children}</button>;

};

export default React.memo(Button);
