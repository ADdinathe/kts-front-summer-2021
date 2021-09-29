import inputStyle from './input.module.scss';
import React from "react";
import { Meta } from "utils/meta";

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled: Meta;
}


const Input: React.FC<InputProps> = ({onChange, value, placeholder, disabled}) => {
    return <input className={inputStyle.searchBar__input} name="s" value={value} onChange={onChange} placeholder={placeholder}
                  disabled={disabled === Meta.loading} type="text"/>;

};

export default Input;

