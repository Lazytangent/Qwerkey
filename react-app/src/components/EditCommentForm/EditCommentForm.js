import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { updateComment } from "../../store/comments";
import { useCommentContext } from "../../context/CommentContext";
import FormTitle from "../parts/FormTitle";
import SubmitFormButton from "../parts/SubmitFormButton";

const EditCommentForm = ({ setShowEditModal }) => {
  const dispatch = useDispatch();

  const { comment } = useCommentContext();

  const [body, setBody] = useState(comment.body);
  const [errors, setErrors] = useState([]);
  const textAreaRef = useRef();

  useEffect(() => {
    const commentLength = body.length;
    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(commentLength, commentLength);
  }, [body.length]);

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedComment = {
      id: comment.id,
      body,
      user_id: comment.user.id,
    };
    const post = await dispatch(updateComment(updatedComment));
    if (!post.errors) {
      setBody("");
      setShowEditModal(false);
    } else {
      setErrors(["A body is required to make a comment."]);
    }
  };

  return (
    <div className="p-4 bg-white rounded dark:bg-gray-800 dark:text-gray-50">
      <form onSubmit={submitHandler}>
        {errors.length > 0 && (
          <div className="flex flex-col items-center text-red-600">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <FormTitle title="Update your Comment" />
        <div className="flex justify-center p-2">
          <textarea
            className="w-3/4 p-2 mb-1 border rounded dark:bg-gray-800 dark:text-gray-50"
            name="commentBody"
            placeholder="Update your Comment"
            value={body}
            onChange={updateBody}
            ref={textAreaRef}
          />
        </div>
        <SubmitFormButton label="Update Comment" />
      </form>
    </div>
  );
};

export default EditCommentForm;
