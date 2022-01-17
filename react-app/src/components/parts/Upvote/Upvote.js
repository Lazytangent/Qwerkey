import { useSelector, useDispatch } from 'react-redux';

import { ArrowUpward } from '@material-ui/icons';

import { session } from '../../../store/selectors';
import { ratePost } from '../../../store/posts';
import { rateComment } from '../../../store/comments';

const Upvote = ({ id, type, rating }) => {
  const dispatch = useDispatch();
  const user = useSelector(session.user());

  const onUpvote = () => {
    switch (type) {
      case 'post':
        dispatch(ratePost({ userId: user.id, postId: id, rating: 1 }));
        break;
      case 'comment':
        dispatch(rateComment({ userId: user.id, commentId: id, rating: 1 }));
        break;
      default:
        break;
    }
  };

  const onUnUpvote = () => {
    switch (type) {
      case 'post':
        dispatch(ratePost({ userId: user.id, postId: id, rating: 0 }));
        break;
      case 'comment':
        dispatch(rateComment({ userId: user.id, commentId: id, rating: 0 }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      {rating === 1 ? (
        <button
          onClick={onUnUpvote}
          className="p-2 mx-2 border rounded border-green text-green hover:border-gray-50 active:bg-none hover:text-gray-50"
        >
          <ArrowUpward />
        </button>
      ) : (
        <button
          onClick={onUpvote}
          className="p-2 mx-2 border rounded hover:border-green active:bg-green hover:text-green"
        >
          <ArrowUpward />
        </button>
      )}
    </>
  );
};

export default Upvote;
