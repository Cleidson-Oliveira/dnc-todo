import editIcon from "../../assets/pencil.svg";
import trashIcon from "../../assets/trash.svg";
import { useTasks } from "../../hooks/useTasks";
import { Checkbox } from "../checkbox";
import "./style.scss";

interface TasksTableProps {}

export function TasksTable (props: TasksTableProps) {

    const { tasks } = useTasks();

    return (
        <div className="tasks-table">
            <div className="tasks-table__head">
                <p>Tarefas</p>
                <p>Status</p>
                <p>Opções</p>
            </div>

            { tasks.map((task) => (
                <div key={task.id} className="tasks-table__row">
                    <p>
                        {task.title}
                    </p>

                    <Checkbox />
                    
                    <div>
                        <button> <img src={editIcon}/> </button>
                        <button> <img src={trashIcon}/> </button>
                    </div>
                </div>
            ))}

        </div>
    )
}