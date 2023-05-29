import { useState, ButtonHTMLAttributes } from "react";
import uncheckedIcon from "../../assets/checkbox-blank.svg";
import checkedIcon from "../../assets/checkbox-full.svg";

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onChangeStatus?(): void
}

export function Checkbox ({ onChangeStatus, ...props }: CheckboxProps) {

    const [ checked, setChecked ] = useState(false)

    const handleCheck = () => {
        setChecked(prevState => !prevState);

        if ( onChangeStatus ) {
            onChangeStatus();
        }
    }

    return (
        <button onClick={handleCheck} {...props} >
            { 
                checked 
                ? <img src={checkedIcon} />
                : <img src={uncheckedIcon} />
            }
        </button>
    )
}