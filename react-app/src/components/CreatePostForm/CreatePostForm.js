import { useState } from 'react';

import { useCreatePostContext } from '../../context/CreatePostContext';
import FormTitle from '../parts/FormTitle';
import FormErrors from '../parts/FormErrors';
import InputField from '../parts/InputField';
import SubmitFormButton from '../parts/SubmitFormButton';

const CreatePostForm = () => {
  const { showCreatePostModal, setShowCreatePostModal } = useCreatePostContext();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  return (
    <div className="p-4 bg-white rounded">
      <form>
        <FormTitle title="Create a Post" />
        <FormErrors errors={errors} />
        <InputField
          name="title"
          type="text"
          placeholder="Title"
          onChange={updateTitle}
          value={title}
          required={true}
        />
        <InputField
          name="body"
          type="textarea"
          placeholder="Body"
          onChange={updateBody}
          value={body}
          required={true}
        />
        <SubmitFormButton label="Create a Post" />
      </form>
    </div>
  );
};

export default CreatePostForm;
