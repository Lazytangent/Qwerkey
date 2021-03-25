import { NavLink } from "react-router-dom";

import DivCard from "../parts/DivCard";

const Meetup = ({ meetup }) => {
  return (
    <DivCard>
      <h3 className="p-2">
        <NavLink to={`/meetups/${meetup.id}`}>
          <span className="hover:underline">
            {meetup.name}
          </span>
        </NavLink>
      </h3>
    </DivCard>
  );
};

export default Meetup;
