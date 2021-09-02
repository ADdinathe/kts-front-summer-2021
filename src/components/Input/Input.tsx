import "./input.css"
import React from "react";

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled: boolean;
}


const Input: React.FC<InputProps> = ({onChange, value, placeholder, disabled}) => {
    return <input className="search-bar__input" name="s" value={value} onChange={onChange} placeholder={placeholder}
                  disabled={disabled} type="text"/>;

};

export default Input;

