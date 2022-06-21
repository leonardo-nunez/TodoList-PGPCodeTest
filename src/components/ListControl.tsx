import { useState } from 'react';

interface IListControlProps {
  addTodo: AddTodo;
}

const ListControl = ({ addTodo }: IListControlProps) => {
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
      {/* <input type='radio' value='all' /> All
      <input type='radio' value='all' /> To Do
      <input type='radio' value='all' /> Done */}
    </>
  );
};

export default ListControl;
