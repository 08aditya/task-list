import React, { useEffect, useState } from 'react'
import Taskitem from './Taskitem'
import TaskForm from './TaskForm'

const Tasklist = () => {
    const [Tasks, Settasks] = useState([])
    const [Addtask, setaddtask] = useState('')
    const [newtask, setNewTask] = useState('')
    const [fltrcat, setFltrcat] = useState([])

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            Settasks(JSON.parse(storedTasks));
        }
    }, [])

    useEffect(() => {
        if (Tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(Tasks))
        }
    }
        , [Tasks])

    const addTask = (newtask, category) => {
        if (newtask !== "" && category !== '') {
            Settasks([...Tasks, { id: Date.now(), data: newtask, completed: false, isedit: false, type: category }])
        }
    }

    const Deletetask = (taskId) => {
        Settasks(prevTasks => {
            const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        })
    }

    const handleToggle = (TaskId) => {
        Settasks(
            prevTasks => {
                const updatedTasks = prevTasks.map((task) =>
                    task.id === TaskId ? { ...task, completed: !task.completed } : task
                );
                return updatedTasks;
            });
    }

    const editTask = (taskId) => {
        Settasks(
            Tasks.map((task) =>
                task.id === taskId ? { ...task, data: newtask, isedit: false } : task
            )
        );
        setNewTask('')
    }

    const toggeledit = (task1) => {
        Settasks(
            Tasks.map((task) =>
                task.id === task1.id ? { ...task, isedit: true } : task
            )
        )
        setNewTask(task1.data)
    }

    const handelfilter = (type) => {
        setFltrcat(() => {
            const filteredTasks = Tasks.filter((task) => type === task.type);
            console.log(filteredTasks, type);
            return filteredTasks;
        });
        setaddtask(type)
    }

    return (
        <div className='center-container'>
            <div className='centered-div'>
                <h1>Task Mangment App</h1>
                <div className='add-task-bar'>
                    <TaskForm createtask={addTask} />
                </div>
                <div>
                    <h3>{Tasks.length > 1 ? "Tasks" : "Task"} List</h3>

                    <select name="filter" onChange={(e) => { handelfilter(e.target.value) }}>
                        <option value=" ">select filter</option>
                        <option value='personal'>Personal</option>
                        <option value="work">work</option>
                        <option value="other">other</option>
                    </select>
                </div>

                <ul className="task-list">{
                    Tasks.map((task) => {
                        return (
                            <li key={task.id} className='task'>
                                {task.isedit ?
                                    <>
                                        <input type='text' value={newtask} onChange={(e) => { setNewTask(e.target.value) }} />
                                        <div className='button-container'>
                                            <button onClick={() => { editTask(task.id) }}>save</button>
                                            <button onClick={() => Deletetask(task.id)}>Delete</button>
                                        </div>
                                    </>
                                    : <>
                                        <Taskitem data={task} onToggle={handleToggle} />
                                        <div className='button-container'>
                                            <button onClick={() => { toggeledit(task) }}>edit</button>
                                            <button onClick={() => Deletetask(task.id)}>Delete</button>
                                        </div>
                                    </>
                                }
                            </li>
                        )
                    })}
                </ul>
                <hr />
                <h3>filter task by type {Addtask}</h3>
                <ul className='task-list'>
                    {fltrcat.map((task) => {
                        return (
                            <li key={task.id} className='task'>
                                {task.isedit ?
                                    <>
                                        <input type='text' value={newtask} onChange={(e) => { setNewTask(e.target.value) }} />
                                        <div className='button-container'>
                                            <button onClick={() => { editTask(task.id) }}>save</button>
                                            <button onClick={() => Deletetask(task.id)}>Delete</button>
                                        </div>
                                    </>
                                    : <>
                                        <Taskitem data={task} onToggle={handleToggle} />
                                        <div className='button-container'>
                                            <button onClick={() => { toggeledit(task) }}>edit</button>
                                            <button onClick={() => Deletetask(task.id)}>Delete</button>
                                        </div>
                                    </>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Tasklist