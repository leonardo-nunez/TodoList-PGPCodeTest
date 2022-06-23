import { useState, useCallback, useEffect } from 'react';
import TodoItem from './TodoItem';
import ListControl from './ListControl';
import update from 'immutability-helper';

interface IListProps {
  listName: string;
  listId: number;
  deleteList: DeleteListType;
  lists: IList[];
  setLists: React.Dispatch<React.SetStateAction<IList[]>>;
}

const List = ({
  setLists,
  lists,
  listId,
  listName,
  deleteList,
}: IListProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [view, setView] = useState('all');

  useEffect(() => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, todos: todos };
      }
      return list;
    });

    setLists(newLists);
  }, [todos]); // eslint-disable-line

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
    <div className={`list list--${listName}`}>
      <ListControl
        addTodo={addTodo}
        todoView={todoView}
        listName={listName}
        deleteList={deleteList}
      />
      <div>{todos.map((item, i) => renderCard(item, i, view))}</div>
    </div>
  );
};

export default List;
