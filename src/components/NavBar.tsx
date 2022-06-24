import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

interface INavBarProps {
  lists: IList[];
  newListName: string;
  setNewListName: (value: string) => void;
  addList: AddListType;
  // setRouteIndex: React.Dispatch<React.SetStateAction<number>>;
}
const NavBar = ({
  lists,
  newListName,
  setNewListName,
  addList,
}: // setRouteIndex,
INavBarProps) => {
  return (
    <div className="navbar">
      <div className="navbar__list">
        {lists.map((list, i) => (
          <Link key={i} to={`lists/${list.name}`}>
            {/* <button className="navbar__button" onClick={() => setRouteIndex(i)}> */}
            <button className="navbar__button">{list.name}</button>
          </Link>
        ))}
      </div>
      <form>
        <input
          type="text"
          placeholder="Add new list"
          value={newListName}
          required
          onChange={(e) => setNewListName(e.target.value)}
        />
        <IconButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addList(newListName);
            setNewListName('');
          }}
        >
          <AddIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default NavBar;
