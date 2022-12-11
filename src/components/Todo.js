import React, { useState } from "react";

export default function Todo(props) {
  const [newName, setNewName] = useState(props.name);
  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const [isEditing, setEditing] = useState(false);

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}></label>
        <input id={props.id} className="todoinput" type="text" value={newName} onChange={handleChange}/>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" 
          onClick={() => {
            setNewName(props.name);
            setEditing(false);
          }}>Cancel</button>
        <button type="submit" className="btn"
          onClick={() => {
            props.editTask(props.id, newName);
            setEditing(false);
          }} >Save</button>
      </div>
    </form>
  );

  const view = (
    <div className="todo">
      <div className="c">
        <input
          id={props.id}
          type="checkbox"
          className="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setEditing(true);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            props.deleteTask(props.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return isEditing ? editingTemplate : view;
}
