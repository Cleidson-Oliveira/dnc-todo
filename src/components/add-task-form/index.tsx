import { useState } from "react";
import add from "../../assets/add.svg";
import "./styles.scss"

interface AddTaskFormProps {
    onCreateNewTask(taskName: string): void
}

export function AddTaskForm ({ onCreateNewTask }: AddTaskFormProps) {

    const [nameTask, setNameTask] = useState<string>("");

    const handleCreateTask = () => {
        if (nameTask === "") return;
        
        onCreateNewTask(nameTask);
        setNameTask("");
    }

    return (
        <div className="form" >
            <input 
                type="text" 
                placeholder="Nova tarefa..."
                value={nameTask} 
                onChange={(e) => setNameTask(e.target.value)}
            />
            <button onClick={handleCreateTask}>
                <img src={add} />
            </button>
        </div>
    )
}