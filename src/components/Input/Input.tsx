import inputStyle from "./input.module.scss";
import React from "react";
import {Meta} from "utils/meta";

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled: Meta;
    onKeyDown: (e: React.KeyboardEvent) => void;
}


const Input: React.FC<InputProps> = ({onChange, value, placeholder, disabled, onKeyDown}) => {
    return <input className={inputStyle.searchBar__input} name="s" value={value} onChange={onChange}
                  placeholder={placeholder} onKeyDown={onKeyDown}
                  disabled={disabled === Meta.loading} type="text"/>;

};

export default Input;

