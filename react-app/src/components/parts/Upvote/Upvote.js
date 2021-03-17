import { useSelector, useDispatch } from "react-redux";

import { ArrowUpward } from "@material-ui/icons";

import { ratePost } from "../../../store/posts";

const Upvote = ({ postId, rating }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const onUpvote = () => {
    dispatch(ratePost({ userId: user.id, postId, rating: 1 }));
  };

  const onUnUpvote = () => {
    dispatch(ratePost({ userId: user.id, postId, rating: 0 }));
  };

  return (
    <>
      {rating === 1 ? (
        <button onClick={onUnUpvote} className="p-2 mx-2 border rounded border-green text-green hover:border-gray-50 active:bg-none hover:text-gray-50">
          <ArrowUpward />
        </button>
      ) : (
        <button onClick={onUpvote} className="p-2 mx-2 border rounded hover:border-green active:bg-green hover:text-green">
          <ArrowUpward />
        </button>
      )}
    </>
  );
};

export default Upvote;
