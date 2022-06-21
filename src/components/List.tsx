import { useState } from 'react';
import TodoItem from './TodoItem';
import ListControl from './ListControl';

const initialTodos: ITodo[] = [
  {
    id: 123,
    text: 'Hello',
    complete: false,
  },
  {
    id: 234,
    text: 'Good bye',
    complete: true,
  },
];

const List = () => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (selectedTodo: ITodo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { id: Number(Date.now()), text, complete: false };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo: DeleteTodo = (todo) => {
    setTodos((prev) => {
      const data = prev.filter((t) => t.id !== todo.id);
      return data;
    });
  };

  return (
    <>
      <ListControl addTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
};

export default List;
