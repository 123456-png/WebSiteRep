import { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button type="button" onClick={() => setEditing(false)}>Отмена</button>
      <button type="submit">Сохранить</button>
    </form>
  );

  const viewTemplate = (
    <div>
      <input
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      />
      {props.name}
      <button onClick={() => setEditing(true)}>Редактировать</button>
      <button onClick={() => props.deleteTask(props.id)}>Удалить</button>
    </div>
  );

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;