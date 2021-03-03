const NavButton = ({ name, onClick }) => {
  return (
    <>
      <button onClick={onClick} className="p-2 rounded bg-purple hover:bg-purple-dark hover:text-white">{name}</button>
    </>
  );
};

export default NavButton;
