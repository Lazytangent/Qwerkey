const EditButton = ({ className, label, children, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} p-2 duration-300 mx-2 border rounded ease-in-out hover:border-yellow-500 focus:bg-yellow-500 focus:ring-0 focus:outline-none`}
      >
        {label}
      </button>
      {children}
    </>
  );
};

export default EditButton;
