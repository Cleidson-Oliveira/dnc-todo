import { useEffect, useState } from "react";
import {v4 as uuid} from "uuid";

interface IOrganizations {
    id: string,
    name: string
}

interface IUseOrganizations {
    organizations: IOrganizations[],
    loadingOrganizations: boolean,
    createOrganizations(name: string): void,
    deleteOrganizations(id: string): void
}

const ORGANIZATIONS_KEY = "@dnc-todo-organizations";

export function useOrganizations (): IUseOrganizations {
    const [organizations, setOrganizations] = useState<IOrganizations[]>([]);
    const [loadingOrganizations, setLoadingOrganizations] = useState<boolean>(true);

    const getOrganizations = async () => {
        const organizations: IOrganizations[] = JSON.parse(localStorage.getItem(ORGANIZATIONS_KEY)!) || [];

        setOrganizations(organizations);

    }

    const createOrganizations = (name: string) => {
        const newOrganization:IOrganizations = {
            id: uuid(),
            name,
        };

        localStorage.setItem(ORGANIZATIONS_KEY, JSON.stringify([newOrganization, ...organizations]));

        setOrganizations(prevState => [newOrganization, ...prevState]);
    }

    const deleteOrganizations = (id: string) => {
        const filteredOrganizations = organizations.filter(org => {
            return org.id !== id;
        })

        localStorage.setItem(ORGANIZATIONS_KEY, JSON.stringify(filteredOrganizations))

        setOrganizations(prevState => {
            const newState = prevState.filter(org => org.id != id);
            
            return newState
        })
    }

    useEffect(() => {
        getOrganizations()
            .then(() => {
                setLoadingOrganizations(prevState => !prevState);
            })
    }, [])

    return {
        organizations,
        createOrganizations,
        deleteOrganizations,
        loadingOrganizations
    }
}