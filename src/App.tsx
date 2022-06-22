import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import List from './components/List';
import NavBar from './components/NavBar';

import './App.css';

const initialList: IList1[] = [
  {
    id: 1,
    name: 'Todo List',
  },
];

function App() {
  const [lists, setLists] = useState(initialList);
  const [listName, setListName] = useState('');

  const addList: AddListType = (name: string) => {
    const newList = { id: Number(Date.now()), name };
    setLists([...lists, newList]);
  };

  const deleteList: DeleteListType = (listName) => {
    setLists((prev) => {
      const data = prev.filter((l) => l.name !== listName);
      return data;
    });
  };

  return (
    <div className="App">
      <NavBar
        lists={lists}
        listName={listName}
        setListName={setListName}
        addList={addList}
      />
      {lists.map((list, index) => (
        <List key={index} listName={list.name} deleteList={deleteList} />
      ))}
    </div>
  );
}

export default App;
