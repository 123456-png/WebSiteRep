import { useState, useEffect } from "react";
import Todo from "./Todo";

import './App.css'
import FilterButton from "./FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    const newTask = { id: `todo-${Date.now()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) return { ...task, completed: !task.completed };
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) return { ...task, name: newName };
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
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

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todoapp">
      <h1>Список задач</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const val = e.target.elements.newItem.value;
        if (val) {
          addTask(val);
          e.target.reset();
        }
      }}>
        <input name="newItem" type="text" placeholder="Что нужно сделать?" />
        <button type="submit">Добавить</button>
      </form>
      <div className="filters">{filterList}</div>
      <h2 id="list-heading">{tasks.filter(FILTER_MAP.Active).length} задач осталось</h2>
      <ul className="todo-list">{taskList}</ul>
    </div>
  );
}

export default App;