import { InputHTMLAttributes } from "react";
import "./styles.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input (props: InputProps) {

    return (
        <input 
            {...props}
            className="input"
        />
    )
}