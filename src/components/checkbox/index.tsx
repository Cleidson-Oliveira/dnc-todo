import { useState } from "react";
import uncheckedIcon from "../../assets/checkbox-blank.svg";
import checkedIcon from "../../assets/checkbox-full.svg";

interface CheckboxProps {
    onChange?(): void
}

export function Checkbox ({ onChange }: CheckboxProps) {

    const [ checked, setChecked ] = useState(false)

    const handleCheck = () => {
        setChecked(prevState => !prevState);

        if ( onChange ) {
            onChange();
        }
    }

    return (
        <button onClick={handleCheck}>
            { 
                checked 
                ? <img src={checkedIcon} />
                : <img src={uncheckedIcon} />
            }
        </button>
    )
}