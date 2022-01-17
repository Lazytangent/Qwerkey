const DeleteButton = ({ className, label, onClick, children }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} p-2 duration-300 mx-2 border rounded hover:border-red-500 ease-in-out focus:bg-red-500 focus:outline-none`}
      >
        {label}
      </button>
      {children}
    </>
  );
};

export default DeleteButton;
