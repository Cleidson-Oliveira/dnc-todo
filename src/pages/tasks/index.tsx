import {useState} from "react";
import { Header } from "../../components/header";
import { Modal } from "../../components/modal";
import { TasksTable } from "../../components/tasks-table";
import { Title } from "../../components/title";

import "./style.scss";

export function Tasks () {

    return (
        <div className="container">
            <Header page="tasks" />
            <Title text="Otimize seu tempo e se organize com o nosso Planejador Diário." />

            <TasksTable />
        </div>
    )
}