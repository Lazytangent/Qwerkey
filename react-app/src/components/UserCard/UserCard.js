import options from "../../utils/localeDateString";

const UserCard = ({ user }) => {
  return (
    <div className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h3>{user.username}</h3>
      <p>Account created on {(new Date(user.created_at).toLocaleString(...options()))}</p>
    </div>
  );
};

export default UserCard;
