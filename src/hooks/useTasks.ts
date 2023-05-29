import { useEffect, useState } from "react";
import axios from "../lib/axios";

export interface ITask {
    id: number,
    title: string,
    completed: boolean
}

interface TUseTasks {
    tasks: ITask[],
    isLoading: boolean,
    addTask(newTaskTitle: string): void, 
    removeTask(id: number): void,
    setTaskAsDone(id: number): void,
    editTaskName(id: number, newTitle: string): void
}

export function useTasks (): TUseTasks {
    
    const [ tasks, setTasks ] = useState<ITask[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const getTasks = async () => {
        const tasks = await axios.get<ITask[]>("/todos");
        
        setTasks(tasks.data);
    }

    const addTask = async (newTaskTitle: string) => {
        const createdTask = await axios.post<ITask>("/todos", {
            title: newTaskTitle, isDone: false
        });

        setTasks(prevState => {
            return [
                createdTask.data,
                ...prevState,
            ]
        });
    }

    const removeTask = async (id: number) => {
        const deletedTask = await axios.delete<ITask>(`/todos/${id}`);

        setTasks(prevState => {
            const newTasksState = prevState.filter(task => task.id != id);
            
            return newTasksState
        })
    }

    const setTaskAsDone = (id: number) => {
        const handleTask = tasks.find(task => task.id === id);

        axios.patch(`/todos/${id}`, { completed: !handleTask?.completed });

        setTasks(prevState => {
            const newState = prevState.map(task => {
                return task.id === id ? {...task, completed: !task.completed} : task
            })

            return newState;
        })
    }
    
    const editTaskName = (id: number, newTitle: string) => {
        axios.patch(`/todos/${id}`, { title: newTitle });

        setTasks(prevState => {
            const newState = prevState.map(task => {
                return task.id === id ? {...task, title: newTitle} : task
            })

            return newState;
        })
    }  
    
    useEffect(() => { 
        getTasks().then(() => {
            setIsLoading(false);
        })
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