import { NavLink } from "react-router-dom";

const Retailer = ({ retailer }) => {
  return (
    <div key={retailer.id}>
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
