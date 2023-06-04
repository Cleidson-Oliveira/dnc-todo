import { useEffect, useState } from "react";
import {v4 as uuid} from "uuid"

export interface ITask {
    id: string,
    title: string,
    completed: boolean
}

interface TUseTasks {
    tasks: ITask[],
    isLoading: boolean,
    addTask(newTaskTitle: string): void, 
    removeTask(id: string): void,
    setTaskAsDone(id: string): void,
    editTaskName(id: string, newTitle: string): void
}

const TASKS_KEY = "@dnc-Todo";

export function useTasks (): TUseTasks {
    
    const [ tasks, setTasks ] = useState<ITask[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const getTasks = async () => {
        const tasks: ITask[] = JSON.parse(localStorage.getItem(TASKS_KEY)!) || [];
        console.log(tasks)
        
        setTasks(tasks);
    }

    const addTask = async (newTaskTitle: string) => {
        const newTask: ITask = {
            id: uuid(),
            title: newTaskTitle,
            completed: false,
        }

        localStorage.setItem(TASKS_KEY, JSON.stringify([newTask, ...tasks]))

        setTasks(prevState => {
            return [
                newTask,
                ...prevState,
            ]
        });
    }

    const removeTask = async (id: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== id;
        })

        localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks))

        setTasks(prevState => {
            const newTasksState = prevState.filter(task => task.id != id);
            
            return newTasksState
        })
    }

    const setTaskAsDone = (id: string) => {
        const updatedTasks = tasks.map(task => {
            return task.id === id ? {...task, completed: !task.completed} : task
        })

        localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks))

        setTasks(prevState => {
            const newState = prevState.map(task => {
                return task.id === id ? {...task, completed: !task.completed} : task
            })

            return newState;
        })
    }
    
    const editTaskName = (id: string, newTitle: string) => {

        const updatedTasks = tasks.map(task => {
            return task.id === id ? {...task, title: newTitle} : task
        })

        localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));

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