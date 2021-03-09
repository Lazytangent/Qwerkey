import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { useSearchContext } from "../../context/SearchContext";
import { getQuery } from "../../store/search";
import Post from "../Post";
import Comment from "../Comment";
import Retailer from "../Retailer";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { searched, setSearched } = useSearchContext();
  const results = useSelector(state => state.search);
  const user = useSelector(state => state.session.user);
  const { posts, comments, retailers } = results;

  useEffect(() => {
    if (!searched) {
      const queryString = location.search.slice(1);
      const queryArr = queryString.split('&').map(chunk => chunk.split('=')[1]);
      dispatch(getQuery(...queryArr));
      setSearched(true);
    }
  }, [dispatch, searched, location.search, setSearched]);

  return (
    <>
      <h3>Posts</h3>
      {posts.length > 0 && posts.map(post => <Post post={post} key={post.id} />)}
      <h3>Comments</h3>
      {comments.length > 0 && comments.map(comment => <Comment comment={comment} key={comment.id} userId={user.id} />)}
      <h3>Retailers</h3>
      {retailers.length > 0 && retailers.map(retailer => <Retailer retailer={retailer} key={retailer.id} />)}
    </>
  );
};

export default SearchResults;
