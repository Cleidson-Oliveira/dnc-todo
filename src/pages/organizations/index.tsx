import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrganizations } from "../../hooks/useOrganizations";
import { Header } from "../../components/header";
import { Title } from "../../components/title";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import trashIcon from "../../assets/trash.svg";

import "./style.scss";

export function Organizations () {
    
    const [organizationName, setOrganizationName] = useState("");

    const {createOrganizations, organizations, deleteOrganizations} = useOrganizations();

    const handleCreateNewOrganization = () => {
        if (organizationName === "") return;

        createOrganizations(organizationName);

        setOrganizationName("");
    }

    const handleDeleteOrganization = (id: string) => {
        deleteOrganizations(id);
    }

    return (
        <div className="container">
            <Header page="organizations" />
            <Title text="Otimize seu tempo e se organize com o nosso Planejador Diário." />
            <div className="mainContent">
                <div className="createNewOrganization">
                    <label>
                        Nome da organização:
                        <Input 
                            type="text"
                            placeholder="Trabalho de casa"
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value) }
                        />
                    </label>
                    <Button onClick={handleCreateNewOrganization} >
                        Criar organização
                    </Button>
                </div>
                <div>
                    <ul className="organizationsList">
                        { organizations.length !== 0 && organizations.map(organization => (
                            <li key={organization.id}>
                                <Link to={`/tasks/${organization.id}`}>
                                    {organization.name}
                                </Link>
                                <button
                                    onClick={() => handleDeleteOrganization(organization.id)}
                                    className="buttonDelete"
                                >  
                                    <img src={trashIcon}/> 
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}