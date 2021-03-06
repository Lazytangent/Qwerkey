import { useState } from "react";

import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const CreateCommentForm = () => {
  const [body, setBody] = useState("");

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-2 mb-2 rounded">
      <form onSubmit={submitComment}>
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
