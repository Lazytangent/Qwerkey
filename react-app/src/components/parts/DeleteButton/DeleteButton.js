const DeleteButton = ({ label }) => {
  return (
    <button className="p-2 mx-2 border rounded hover:border-red-500 ease-in-out focus:bg-red-500 focus:outline-none">{label}</button>
  );
};

export default DeleteButton;
