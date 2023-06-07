import { useState } from "react";
import { AddTaskForm } from "../add-task-form";
import { Checkbox } from "../checkbox";
import { Modal } from "../modal";
import { useTasks } from "../../hooks/useTasks";
import editIcon from "../../assets/pencil.svg";
import trashIcon from "../../assets/trash.svg";
import "./style.scss";
import { Input } from "../input";
import { useParams } from "react-router-dom";

export function TasksTable () {

    const [deleteTaskModalIsOpen, setDeleteTaskModalIsOpen] = useState(false);
    const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [handleItemId, setHandledItemId] = useState<string>("");
    const { organizarionId } = useParams();

    const { tasks, removeTask, addTask, setTaskAsDone, editTaskName } = useTasks();

    const handleCreateNewTask = (nameTask: string) => {
        addTask(nameTask, organizarionId!);
    }

    const handleEditTask = () => {
        if (taskName === "") return;

        editTaskName(handleItemId, taskName);
        setTaskName("");
        handleEditTaskModalIsOpen();
    }

    const handleDeleteTask = () => {
        removeTask(handleItemId);
        handleDeleteTaskModalIsOpen();
    }

    const handleTaskStatus = (id: string) => {
        setTaskAsDone(id);
    }

    const handleDeleteTaskModalIsOpen = (id?: string) => {
        if(id) setHandledItemId(id);
        setDeleteTaskModalIsOpen(prevState => !prevState);
    }

    const handleEditTaskModalIsOpen = (id?: string) => {
        if(id) setHandledItemId(id);
        setEditTaskModalIsOpen(prevState => !prevState);
    }

    return (
        <div className="tasks-table">
            <div className="tasks-table__head">
                <p>Tarefas</p>
                <p>Status</p>
                <p>Opções</p>
            </div>

            { !tasks.some(
                task => organizarionId === task.organizationId
            ) && (
                <div className="tasks-table__row">Lista vazia. Adicione uma tarefa abaixo.</div>
            )}
            
            { tasks.map((task) => {
                return organizarionId === task.organizationId && (
                    <div key={task.id} className="tasks-table__row">
                        <p className="name">
                            {task.title}
                        </p>

                        <Checkbox 
                            className="status" 
                            onChangeStatus={() => handleTaskStatus(task.id)} 
                            isChecked={task.completed}
                        />
                        
                        <div className="controls">
                            <button
                                onClick={() => handleEditTaskModalIsOpen(task.id)}
                            > 
                                <img src={editIcon}/> 
                            </button>
                            <button
                                onClick={() => handleDeleteTaskModalIsOpen(task.id)}
                            >  
                                <img src={trashIcon}/> 
                            </button>
                        </div>
                    </div>
                )
            })}

            <AddTaskForm onCreateNewTask={handleCreateNewTask} />

            <Modal modalIsOpen={deleteTaskModalIsOpen}>
                <h1>Deseja excluir esse item?</h1>
                <p>Realmente deseja excluir este item?</p>
                <div>
                    <button onClick={handleDeleteTask}>Sim</button>
                    <button onClick={() => handleDeleteTaskModalIsOpen()}>Não</button>
                </div>
            </Modal>

            <Modal modalIsOpen={editTaskModalIsOpen}>
                <h1>Deseja renomear esse item?</h1>
                <Input 
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value) }
                    placeholder="Digite o novo nome..."
                />
                <div>
                    <button onClick={handleEditTask}>Sim</button>
                    <button onClick={() => handleEditTaskModalIsOpen()}>Não</button>
                </div>
            </Modal>

        </div>
    )
}