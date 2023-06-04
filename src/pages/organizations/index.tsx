import { Header } from "../../components/header";
import { Title } from "../../components/title";

interface OrganizationsProps {}

export function Organizations (props: OrganizationsProps) {

    return (
        <div className="container">
            <Header page="organizations" />
            <Title text="Otimize seu tempo e se organize com o nosso Planejador Diário." />
            
        </div>
    )
}