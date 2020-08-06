import React from 'react'

export const TaskBanner = props => (
    <h4 className="bg-primary text-center text-light py-4 mb-0">{props.userName}'s To Do App ({props.tasksList.filter(task => !task.done).length} tasks to do)</h4>
)