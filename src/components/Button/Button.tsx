import buttonStyle from "./Button.module.scss";
import React from "react";
import { Meta } from "utils/meta";


type ButtonProps = {
    children?: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    disabled: Meta;
}


const Button: React.FC<ButtonProps> = ({children, onClick, disabled}) => {

        return <button className={buttonStyle.searchBar__button} onClick={onClick} type="submit"
                       disabled={disabled === Meta.loading}>{children}</button>;


};

export default React.memo(Button);
