import { NavLink } from 'react-router-dom';

const Community = ({ community }) => {
  return (
    <div className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h2 className="p-2">
        <NavLink to={`/q/${community.name}`}>
          <span className="hover:underline">{community.name}</span>
        </NavLink>
      </h2>
      <p className="p-2">{community.description}</p>
    </div>
  );
};

export default Community;
