import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { useSearchContext } from "../../context/SearchContext";
import { getQuery } from "../../store/search";
import Post from "../Post";
import Comment from "../Comment";
import Retailer from "../Retailer";
import AdvSearchBar from "../AdvSearchBar";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { searched, setSearched } = useSearchContext();
  const results = useSelector((state) => state.search);
  const user = useSelector((state) => state.session.user);
  const { posts, comments, retailers } = results;

  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (!searched) {
      (async () => {
        const queryString = location.search.slice(1);
        const queryArr = queryString
          .split("&")
          .map((chunk) => chunk.split("=")[1]);
        await dispatch(getQuery(...queryArr));
        setSearched(true);
      })();
    }
  }, [dispatch, searched, location.search, setSearched]);

  useEffect(() => {
    if (!(posts.length || comments.length || retailers.length) && searched) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [posts.length, comments.length, retailers.length, searched]);

  return (
    <>
      <AdvSearchBar />
      {noResults && (
        <div className="p-2 text-center">
          <h3>
            We found nothing that matches your search query. Please try again.
          </h3>
        </div>
      )}
      {posts.length > 0 && (
        <>
          <div className="p-2">
            <h3>Posts</h3>
            <hr />
          </div>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </>
      )}
      {comments.length > 0 && (
        <>
          <div className="p-2">
            <h3>Comments</h3>
            <hr />
          </div>
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} userId={user.id} />
          ))}
        </>
      )}
      {retailers.length > 0 && (
        <>
          <div className="p-2">
            <h3>Retailers</h3>
            <hr />
          </div>
          {retailers.map((retailer) => (
            <Retailer retailer={retailer} key={retailer.id} />
          ))}
        </>
      )}
    </>
  );
};

export default SearchResults;
