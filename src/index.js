import React from "react";
import ReactDOM from "react-dom/client";
import "./Style/index.css";
import App from "./App.js";


const todoDetails = JSON.parse(localStorage.getItem("todos")) || [
  { id: "1", name: "Luyen Code", completed: false },
  
];

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App
      tasks={todoDetails}
      FILTER_NAMES={FILTER_NAMES}
      FILTER_MAP={FILTER_MAP}
    />
  </React.StrictMode>
);

ReactDOM.render(<App tasks={todoDetails} />, document.getElementById("root"));


