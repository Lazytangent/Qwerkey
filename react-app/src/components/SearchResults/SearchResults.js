import { useSelector, useDispatch } from "react-redux";

import { useSearchContext } from "../../context/SearchContext";
import Post from "../Post";
import Comment from "../Comment";
import Retailer from "../Retailer";

const SearchResults = () => {
  const { searchInput, setSearchInput } = useSearchContext();
  const results = useSelector(state => state.search);
  const user = useSelector(state => state.session.user);
  const { posts, comments, retailers } = results;

  return (
    <>
      <h3>Posts</h3>
      {posts.length > 0 && posts.map(post => <Post post={post} />)}
      <h3>Comments</h3>
      {comments.length > 0 && comments.map(comment => <Comment comment={comment} userId={user.id} />)}
      <h3>Retailers</h3>
      {retailers.length > 0 && retailers.map(retailer => <Retailer retailer={retailer} />)}
    </>
  );
};

export default SearchResults;
