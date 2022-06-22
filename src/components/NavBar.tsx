interface INavBarProps {
  lists: IList1[];
  listName: string;
  setListName: (value: string) => void;
  addList: AddListType;
}
const NavBar = ({ lists, listName, setListName, addList }: INavBarProps) => {
  return (
    <div className="navbar">
      <div className="navbar__list">
        {lists.map((list, i) => (
          <h4 key={i}>{list.name}</h4>
        ))}
      </div>
      <form>
        <input
          type="text"
          placeholder="Add new List"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addList(listName);
            setListName('');
          }}
        >
          +
        </button>
      </form>
    </div>
  );
};

export default NavBar;
