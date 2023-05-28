import "./style.scss"

interface HeaderProps {
    page: "organizations" | "tasks"
}

export function Header ({ page }: HeaderProps) {

    return (
        <header className="header">
            <ul className="menu">
                <li className={page === "organizations" ? "menu__item--active" : "menu__item"}>
                    Organizações
                </li>
                <li className={page === "tasks" ? "menu__item--active" : "menu__item"}>
                    Tarefas
                </li>
            </ul>
        </header>
    )
}