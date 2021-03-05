const EditButton = ({ label, children }) => {
  return (
    <>
      <button className="p-2 mx-2 border rounded hover:border-yellow-500 focus:bg-yellow-500 focus:ring-0 focus:outline-none">{label}</button>
      { children }
    </>
  );
};

export default EditButton;
