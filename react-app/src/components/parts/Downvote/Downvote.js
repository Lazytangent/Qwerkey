import { useSelector, useDispatch } from "react-redux";

import { ArrowDownward } from "@material-ui/icons";

import { ratePost } from "../../../store/posts";

const Downvote = ({ postId, rating }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const onDownvote = () => {
    dispatch(ratePost({ userId: user.id, postId, rating: -1 }));
  };

  const onUnDownvote = () => {
    dispatch(ratePost({ userId: user.id, postId, rating: 0 }));
  }

  return (
    <>
      {rating === -1 ? (
        <button onClick={onUnDownvote} className="p-2 mx-2 border rounded border-purple text-purple hover:border-gray-50 active:bg-none hover:text-gray-50">
          <ArrowDownward />
        </button>
      ) : (
        <button onClick={onDownvote} className="p-2 mx-2 border rounded hover:border-purple active:bg-purple hover:text-purple">
          <ArrowDownward />
        </button>
      )}
    </>
  );
};

export default Downvote;
