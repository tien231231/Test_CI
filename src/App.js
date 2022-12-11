import './Style/App.css'
import Todo from "./components/Todo";
import Form from "./components/Form";

import React, { useEffect, useState } from "react";


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const addTask = (name) => {
    if (name === "") return;
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const taskList = tasks
    .filter(props.FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
    
  }, [tasks]);

  return (
    <div className="todoapp">
      <h1>#Todo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception flex">
        <button
        type="button"
        className="btn flex1"
        onClick={() => setFilter('All')}
  >     
        <span>All tasks</span>
      </button>
      <button
        type="button"
        className="btn flex1"
        onClick={() => setFilter('Active')}
  >     
        <span>Active tasks</span>
      </button>
      <button
        type="button"
        className="btn flex1"
        onClick={() => setFilter('Completed')}
  >     
        <span>Completed tasks</span>
      </button>
        </div>
      <div
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </div>
    </div>
  );
}

export default App;
