import { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName) return;
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label">Новое имя для {props.name}</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button type="button" onClick={() => setEditing(false)}>Отмена</button>
        <button type="submit">Сохранить</button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className={props.completed ? "strikethrough" : ""}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" onClick={() => setEditing(true)}>✎ Редактировать</button>
        <button type="button" onClick={() => props.deleteTask(props.id)}>✖ Удалить</button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;