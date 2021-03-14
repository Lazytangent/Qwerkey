import Post from "../Post";

const UserCard = ({ user }) => {
  return (
    <>
      <h3>Placeholder for UserCard</h3>
      <h3>{user.username}</h3>
      <h5>Posts</h5>
      <p>{user.posts.map(post => <Post post={post} />)}</p>
    </>
  );
};

export default UserCard;
