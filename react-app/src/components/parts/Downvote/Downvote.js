import { useSelector, useDispatch } from "react-redux";

import { ArrowDownward } from "@material-ui/icons";

import { session } from '../../../store/selectors';
import { ratePost } from "../../../store/posts";
import { rateComment } from "../../../store/comments";

const Downvote = ({ id, type, rating }) => {
  const dispatch = useDispatch();
  const user = useSelector(session.user());

  const onDownvote = () => {
    switch (type) {
      case "post":
        dispatch(ratePost({ userId: user.id, postId: id, rating: -1 }));
        break;
      case "comment":
        dispatch(rateComment({ userId: user.id, commentId: id, rating: -1 }));
        break;
      default:
        break;
    }
  };

  const onUnDownvote = () => {
    switch (type) {
      case "post":
        dispatch(ratePost({ userId: user.id, postId: id, rating: 0 }));
        break;
      case "comment":
        dispatch(rateComment({ userId: user.id, commentId: id, rating: 0 }));
        break;
      default:
        break;
    }
  }

  return (
    <>
      {rating === -1 ? (
        <button onClick={onUnDownvote} className="p-2 mx-2 border rounded border-purple text-purple active:outline-none focus:outline-none hover:border-gray-50 active:bg-none hover:text-gray-50">
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
