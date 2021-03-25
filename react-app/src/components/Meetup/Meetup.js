import { NavLink } from "react-router-dom";

import DivCard from "../parts/DivCard";
import UserName from "../parts/UserName";
import options from "../../utils/localeDateString";

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
      <p className="p-2">{meetup.description}</p>
      <hr />
      <p className="p-2">
        Organized by <UserName link={`/users/${meetup.user.id}`} username={meetup.user.username} />
      </p>
      <p className="p-2">
        Scheduled for {new Date(meetup.date).toLocaleString(...options())} in {meetup.city}, {meetup.state}
      </p>
    </DivCard>
  );
};

export default Meetup;
