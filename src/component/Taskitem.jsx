import React, { useState } from 'react'

const Taskitem = ({data , onToggle}) => {
    const [task, setTask] = useState(data)
    return (
        <div className=''> 
            <input
                type='checkbox'
                // onClick={() => onToggle(task.id)}
                onChange={() => onToggle(task.id)}
                checked={data.completed}
             />
             <span 
             style={{textDecoration: data.completed ? 'line-through' : 'none' }}>
                {task.data}
             </span>
        </div>
    )
}

export default Taskitem