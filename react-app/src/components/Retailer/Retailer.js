import { NavLink } from "react-router-dom";

const Retailer = ({ retailer }) => {
  return (
    <div className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-600 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h2>
        <NavLink to={`/retailers/${retailer.id}`}>
          <span className="hover:underline">{retailer.name}</span>
        </NavLink>
      </h2>
      <p>{retailer.description}</p>
    </div>
  );
};

export default Retailer;
