import { useState, useCallback } from 'react';
import TodoItem from './TodoItem';
import ListControl from './ListControl';
import update from 'immutability-helper';

interface IListProps {
  listName: string;
  deleteList: DeleteListType;
}

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

const List = ({ listName, deleteList }: IListProps) => {
  const [todos, setTodos] = useState(initialTodos);
  const [view, setView] = useState('all');

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTodos((prev: ITodo[]) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex] as ITodo],
        ],
      })
    );
  }, []);

  const addTodo: AddTodoType = (text: string) => {
    const newTodo = { id: Number(Date.now()), text, complete: false };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo: DeleteTodoType = (todo) => {
    setTodos((prev) => {
      const data = prev.filter((t) => t.id !== todo.id);
      return data;
    });
  };

  const todoView = (chosenview: string) => {
    setView(chosenview);
  };

  const renderCard = useCallback(
    (
      item: { id: number; text: string; complete: boolean },
      index: number,
      view: string
    ) => {
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
      return (
        <TodoItem
          key={item.id}
          index={index}
          id={item.id}
          text={item.text}
          complete={item.complete}
          moveCard={moveCard}
          todo={item}
          view={view}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      );
    },
    [moveCard, todos]
  );

  return (
    <>
      <ListControl
        addTodo={addTodo}
        todoView={todoView}
        listName={listName}
        deleteList={deleteList}
      />
      <ul>
        <div>{todos.map((item, i) => renderCard(item, i, view))}</div>
      </ul>
    </>
  );
};

export default List;
