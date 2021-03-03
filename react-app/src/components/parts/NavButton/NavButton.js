const NavButton = ({ name, onClick, children }) => {
  return (
    <>
      <button onClick={onClick} className="m-1 p-2 rounded bg-purple hover:bg-purple-dark hover:text-white">{name}</button>
      { children }
    </>
  );
};

export default NavButton;
