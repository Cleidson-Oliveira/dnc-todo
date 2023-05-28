import { useEffect, useState } from "react";

interface ITask {
    id: number,
    title: string,
    isDone: boolean
}

interface ty {
    tasks: ITask[],
    isLoading: boolean,
    addTask(newTask: ITask): void, 
    removeTask(): void,
    setTaskAsDone(): void,
    editTaskName(): void
}

export function useTasks (): ty {
    const [ tasks, setTasks ] = useState<ITask[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const getTasks = async () => {
        const data = await fetch("http://localhost:3000/tasks");
        const tasks = await data.json();

        setTasks(tasks);
        setIsLoading(false);
    }

    const addTask = (newTask: ITask) => {
        setTasks(prevState => [ ...prevState, newTask ])
    }

    const removeTask = () => {}
    const setTaskAsDone = () => {}
    const editTaskName = () => {}  
    
    useEffect(() => {
        getTasks();

    }, [])

    return {
        tasks,
        isLoading,
        addTask, 
        removeTask,
        setTaskAsDone,
        editTaskName
    }
}