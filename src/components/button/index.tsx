import { ButtonHTMLAttributes } from "react";
import "./styles.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button ({children, ...rest}: ButtonProps) {

    return (
        <button
            {...rest}
        >
            {children}
        </button>
    )
}