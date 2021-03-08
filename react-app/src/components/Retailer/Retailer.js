import { NavLink } from "react-router-dom";

import options from "../../utils/localeDateString";

const Retailer = ({ retailer }) => {
  return (
    <div className="p-2 mb-2 rounded shadow hover:shadow-lg dark:bg-gray-600 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h2 className="p-2">
        {retailer.owner.username}'s{" "}
        <NavLink to={`/retailers/${retailer.id}`}>
          <span className="hover:underline">{retailer.name}</span>
        </NavLink>
      </h2>
      <p className="p-2">{retailer.description}</p>
      <hr />
      <p className="p-2">Est. {(new Date(retailer.created_at).toLocaleString(...options()))}</p>
    </div>
  );
};

export default Retailer;
