import "./styles.scss";

interface ModalProps {
    title: string,
    description: string
}

export function Modal ({description, title}: ModalProps) {

    return (
        <div className="outside-modal">
            <div className="modal">
                <h1>{title}</h1>
                <p>{description}</p>
                <div>
                    <button>Sim</button>
                    <button>Não</button>
                </div>
            </div>
        </div>
    )
}