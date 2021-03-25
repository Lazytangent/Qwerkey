import { NavLink } from "react-router-dom";

const UserName = ({ username, link }) => {
  return (
    <>
      <NavLink to={link}><span className="underline hover:text-green">{username}</span></NavLink>
    </>
  );
};

export default UserName;
