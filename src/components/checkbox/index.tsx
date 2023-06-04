import { useState, ButtonHTMLAttributes } from "react";
import uncheckedIcon from "../../assets/checkbox-blank.svg";
import checkedIcon from "../../assets/checkbox-full.svg";

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onChangeStatus?(): void,
    isChecked: boolean
}

export function Checkbox ({ onChangeStatus, isChecked, ...props }: CheckboxProps) {

    const handleCheck = () => {

        if ( onChangeStatus ) {
            onChangeStatus();
        }
    }

    return (
        <button onClick={handleCheck} {...props} >
            { 
                isChecked 
                ? <img src={checkedIcon} />
                : <img src={uncheckedIcon} />
            }
        </button>
    )
}