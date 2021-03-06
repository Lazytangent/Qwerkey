import { useState } from "react";
import { useDispatch } from "react-redux";

import { createComment } from "../../store/posts";
import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const CreateCommentForm = ({ userId, postId }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const comment = {
      body,
      user_id: userId,
    };
    const post = await dispatch(createComment(comment, postId));
    if (post.errors) {
      setErrors(["A body is required to make a comment."]);
    } else {
      setBody("");
    }
  };

  return (
    <div className="p-2 mb-2 rounded">
      <form onSubmit={submitComment}>
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
          placeholder="Make a Comment"
          value={body}
          onChange={updateBody}
        />
        <SubmitFormButton label="Submit Comment" />
      </form>
    </div>
  );
};

export default CreateCommentForm;
