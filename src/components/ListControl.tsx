import { useState } from 'react';

interface IListControlProps {
  addTodo: AddTodoType;
  todoView: TodoViewType;
}

const ListControl = ({ addTodo, todoView }: IListControlProps) => {
  const [text, setText] = useState('');

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Add Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addTodo(text);
            setText('');
          }}
        >
          +
        </button>
      </form>
      <div
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          todoView(e.target.value)
        }
      >
        <input type="radio" value="all" name="view" defaultChecked /> All
        <input type="radio" value="todo" name="view" /> To Do
        <input type="radio" value="done" name="view" /> Done
      </div>
    </>
  );
};

export default ListControl;
