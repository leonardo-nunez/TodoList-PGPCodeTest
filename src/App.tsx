import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import List from './components/List';
import NavBar from './components/NavBar';

import './App.css';

// const initialList = [
//   {
//     id: 1,
//     name: 'first List',
//   },
// ];

function App() {
  const [lists, setLists] = useState<IList[]>([]);
  const [newListName, setNewListName] = useState('');
  // const [routeIndex, setRouteIndex] = useState(0);

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

  return (
    <div className="App">
      <NavBar
        lists={lists}
        newListName={newListName}
        setNewListName={setNewListName}
        addList={addList}
        // setRouteIndex={setRouteIndex}
      />
      {/* {lists.map((list, index) => (
        <List
          key={index}
          listName={list.name}
          listId={list.id}
          deleteList={deleteList}
          lists={lists}
          setLists={setLists}
        />
      ))} */}
      <Routes>
        {lists.map((list, index) => (
          <Route
            path={`lists/${list.name}`}
            key={index}
            element={
              <List
                listName={list.name}
                listId={list.id}
                deleteList={deleteList}
                lists={lists}
                setLists={setLists}
              />
            }
          ></Route>
        ))}
      </Routes>
      {/* <Routes>
        <Route
          path={`lists/${lists[routeIndex].name}`}
          element={
            <List
              listName={lists[routeIndex].name}
              listId={lists[routeIndex].id}
              deleteList={deleteList}
            />
          }
        ></Route>
      </Routes> */}
    </div>
  );
}

export default App;
