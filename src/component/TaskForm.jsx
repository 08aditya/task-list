import React, { useState } from 'react'

const TaskForm = ({ createtask }) => {
    const [addTask, setaddtask] = useState('')
    const [category, setCategory] = useState('')
    const handelcreate = (data) => {
        createtask(addTask, category)
        setaddtask('')
        setCategory('')
    }
    return (
        <>
            <input type='text' value={addTask} onChange={(e) => setaddtask(e.target.value)} className="add-task-input" placeholder='add task' />
            <select name="category" onChange={(e) => { setCategory(e.target.value) }}>
                <option selected>select category</option>
                <option value='personal'>Personal</option>
                <option value="work">work</option>
                <option value="other">other</option>
            </select>
            <button onClick={() => handelcreate(addTask)} className="add-task-button">Add task</button>
        </>
    )
}

export default TaskForm