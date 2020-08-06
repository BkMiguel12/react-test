import React, { useState, useEffect } from 'react';
import { TaskRow } from "./components/TaskRow";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from './components/VisibilityControl';

function App() {

  const [userName, setUserName] = useState('Miguel Mendoza');
  const [showCompleted, setShowCompleted] = useState(true);
  const [taskItems, setTaskItems] = useState([
    { name: 'Task One', done: false },
    { name: 'Task Two', done: false },
    { name: 'Task Three', done: true },
    { name: 'Task Four', done: false }
  ]);

  // useEffect to verify if exist data in local storage
  useEffect(() => {
    let data = localStorage.getItem('tasks');

    if( data != null ){
      setTaskItems(JSON.parse(data));
    }
    else{
      setUserName('React Example');
      setTaskItems([
        { name: 'Task One Example', done: false },
        { name: 'Task Two Example', done: true },
        { name: 'Task Three Example', done: false }
      ]);
      setShowCompleted(true);
    }
  }, []);

  // useEffect is run every time the taskitems parameter changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems]);

  const createNewTask = taskName => {
    if( !taskItems.find(t => t.name === taskName) ){
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
    else{
      alert('There is already a task with that description!');
    }
  }

  const deleteTask = task => {
    setTaskItems(taskItems.filter(t => t.name !== task.name));
  }

  const toggleTask = (task) => {
    setTaskItems(taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)))
  }

  // Normal way to create function with returns
  // const taskTableRows = () => {
  //   return(
  //     taskItems.map(task => {
  //       return(
  //         <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
  //       )
  //     })
  //   )
  // }

  // Minified way to create a function
  const taskTableRowsMin = (status) => (
    taskItems
    .filter(task => task.done === status)
    .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} deleteTask={deleteTask} />
    ))
  )

  return (
    <div>
      <TaskBanner userName={userName} tasksList={taskItems} />

      <TaskCreator createNewTaskCb={createNewTask} />

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>

        <tbody>
          { taskTableRowsMin(false) }
        </tbody>
      </table>

      <div className="text-center bg-light my-2 py-3">
        <VisibilityControl isChecked={showCompleted} changeCheckedCb={value => setShowCompleted(value)} description="Completed Taks" />
      </div>

      {
        showCompleted && (
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Desciption</th>
                <th>Done</th>
              </tr>
            </thead>

            <tbody>
              { taskTableRowsMin(true) }
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
