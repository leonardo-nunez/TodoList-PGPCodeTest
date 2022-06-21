import { useState } from 'react';
import List from './List';

const initialList: IList1[] = [
  {
    id: 1,
    name: 'Todo List',
  },
];

const ListContainer = () => {
  const [lists, setLists] = useState(initialList);
  const [name, setName] = useState('');

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
    <>
      <div className="list-container">
        <form>
          <input
            type="text"
            placeholder="New List"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              addList(name);
              setName('');
            }}
          >
            +
          </button>
        </form>
        {lists.map((list, index) => (
          <List key={index} listName={list.name} deleteList={deleteList} />
        ))}
      </div>
    </>
  );
};

export default ListContainer;
