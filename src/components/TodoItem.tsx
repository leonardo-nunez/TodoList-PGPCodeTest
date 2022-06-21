interface ITodoItemProps {
  key: number;
  id: number;
  todo: ITodo;
  toggleTodo: ToggleTodoType;
  deleteTodo: DeleteTodo;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo }: ITodoItemProps) => {
  return (
    <li>
      <label
        style={{ textDecoration: todo.complete ? 'line-through' : undefined }}
      >
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleTodo(todo)}
        />{' '}
        {todo.text}
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteTodo(todo);
        }}
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;
