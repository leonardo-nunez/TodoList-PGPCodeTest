import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import List from './components/List';
import NavBar from './components/NavBar';

import './App.css';

function App() {
  const [lists, setLists] = useState<IList[]>([]);
  const [newListName, setNewListName] = useState('');

  let navigate = useNavigate();

  const addList: AddListType = (name: string) => {
    const newList = { id: Number(Date.now()), name, todos: [] };
    setLists([...lists, newList]);
    navigate(`lists/${newList.name}`);
  };

  const deleteList: DeleteListType = (listName) => {
    setLists((prev) => {
      const data = prev.filter((l) => l.name !== listName);
      return data;
    });
  };

  const updateListTodos: UpdateListTodosType = (listId, todos) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, todos: todos };
      }
      return list;
    });

    // setLists(updatedLists);
  };

  const rendededList = () => {};

  return (
    <div className="App">
      <NavBar
        lists={lists}
        newListName={newListName}
        setNewListName={setNewListName}
        addList={addList}
      />
      <Routes>
        {lists.map((list, index) => (
          <Route
            key={index}
            path={`lists/${list.name}`}
            element={
              <List
                listName={list.name}
                listId={list.id}
                deleteList={deleteList}
                updateListTodos={updateListTodos}
              />
            }
          ></Route>
        ))}
      </Routes>
    </div>
  );
}

export default App;
