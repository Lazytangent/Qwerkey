const DivCard = ({ children }) => {
  return (
    <div className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      { children }
    </div>
  );
};

export default DivCard;
