import { NavLink } from "react-router-dom";

import options from "../../utils/localeDateString";

const Retailer = ({ retailer }) => {
  return (
    <div className="p-2 mb-2 rounded shadow hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h2 className="p-2">
        <NavLink to={`/users/${retailer.owner.id}`}>
          <span className="hover:underline">{retailer.owner.username}</span>
        </NavLink>
        's{" "}
        <NavLink to={`/retailers/${retailer.id}`}>
          <span className="hover:underline">{retailer.name}</span>
        </NavLink>
      </h2>
      <p className="p-2">
        Average rating of:{" "}
        {retailer.ratings.reduce(
          (acc, { rating }, idx) => (acc + rating) / (idx + 1),
          0
        )}
      </p>
      <p className="p-2">{retailer.description}</p>
      <hr />
      <p className="p-2">
        Est. {new Date(retailer.created_at).toLocaleString(...options())}
      </p>
      <p className="px-2">
        Located in {retailer.city}, {retailer.state}
      </p>
    </div>
  );
};

export default Retailer;
