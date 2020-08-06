import React, { useState } from 'react'

export const TaskCreator = props => {

    const [newTask, setNewTask] = useState('');

    const updateTaskValue = event => setNewTask(event.target.value);

    const createNewTask = () => {
        props.createNewTaskCb(newTask);
        setNewTask('');
    };

    return (
        <div className="my-3 px-4">
            <input 
                type="text"
                className="form-control"
                value={newTask}
                placeholder="Task Description"
                onChange={updateTaskValue}
            />

            <div className="text-center">
                <button 
                    className="btn btn-success mt-2 px-3"
                    onClick={createNewTask}>
                    Add
                </button>
            </div>
        </div>
    )
}