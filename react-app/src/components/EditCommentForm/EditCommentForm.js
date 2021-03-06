import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateComment } from "../../store/posts";
import { useCommentContext } from "../../context/CommentContext";
import FormTitle from "../parts/FormTitle";
import FormErrors from "../parts/FormErrors";
import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const EditCommentForm = ({ setShowEditModal }) => {
  const dispatch = useDispatch();

  const { comment } = useCommentContext();

  const [body, setBody] = useState(comment.body);
  const [errors, setErrors] = useState([]);

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedComment = {
      ...comment,
      body,
      user_id: comment.user.id,
    };
    const post = await dispatch(updatedComment(updatedComment));
    if (!post.errors) {
      setBody("");
      setShowEditModal(false);
    } else {
      setErrors(["A body is required to make a comment."]);
    }
  };

  return (
    <div className="p-4 bg-white rounded">
      <form onSubmit={submitHandler}>
        {errors.length > 0 && (
          <div className="flex flex-col items-center text-red-600">
            {errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <InputField
          name="commentBody"
          type="textarea"
          placeholder="Update your Comment"
          value={body}
          onChange={updateBody}
        />
        <SubmitFormButton label="Update Comment" />
      </form>
    </div>
  );
};

export default EditCommentForm;
