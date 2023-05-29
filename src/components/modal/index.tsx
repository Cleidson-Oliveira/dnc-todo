import { ReactNode } from "react";

import "./styles.scss";

interface ModalProps {
    children: ReactNode
    modalIsOpen?: boolean
}

export function Modal ({ children, modalIsOpen=false }: ModalProps) {
    
    return (
        <div className={`outside-modal ${modalIsOpen ? "" : "closed"}`}>
            <div className="modal">
                {children}
            </div>
        </div>
    )
}