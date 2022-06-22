import { Link } from 'react-router-dom';

interface INavBarProps {
  lists: IList[];
  newListName: string;
  setNewListName: (value: string) => void;
  addList: AddListType;
  setRouteIndex: React.Dispatch<React.SetStateAction<number>>;
}
const NavBar = ({
  lists,
  newListName,
  setNewListName,
  addList,
  setRouteIndex,
}: INavBarProps) => {
  return (
    <div className="navbar">
      <div className="navbar__list">
        {lists.map((list, i) => (
          <Link key={i} to={`lists/${list.name}`}>
            <button onClick={() => setRouteIndex(i)}>{list.name}</button>
          </Link>
        ))}
      </div>
      <form>
        <input
          type="text"
          placeholder="Add new List"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addList(newListName);
            setNewListName('');
          }}
        >
          +
        </button>
      </form>
    </div>
  );
};

export default NavBar;
