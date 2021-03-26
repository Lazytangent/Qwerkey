import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updatePost } from '../../store/posts';
import FormTitle from '../parts/FormTitle';
import FormErrors from '../parts/FormErrors';
import InputField from '../parts/InputField';
import SubmitFormButton from '../parts/SubmitFormButton';

const EditPostForm = ({ postId, setShowEditModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const post = useSelector(state => state.posts.posts[postId]);

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [newImages, setNewImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user && post) setIsLoaded(true);
  }, [user, post]);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const updateNewImages = (e) => {
    const files = e.target.files;
    if (files) setNewImages(prev => [...prev, files]);
  };

  const chooseAdditionalImage = () => {
    document.getElementById("image-upload-edit-post").click();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (body || newImages.length) {
      const newPost = await dispatch(updatePost({ title, body, images: newImages, postId, userId: post.user.id, communityId: post.community.id }));
      if (newPost.errors) {
        setErrors(newPost.errors);
      } else {
        setShowEditModal(false);
      }
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="w-screen p-4 bg-white rounded dark:bg-gray-800 dark:text-gray-50 md:w-96">
      <form onSubmit={submitHandler}>
        <FormTitle title="Update your Post" />
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
        />
        <div className="flex flex-col items-center">
          <h5>Images Chosen</h5>
          {post.images && post.images.map(imageUrl => {
            return <div key={imageUrl}><img src={imageUrl} alt={imageUrl} /></div>;
          })}
          {newImages && newImages.map(fileList => (
            Array.from(fileList).map(image => (
              <div key={image.name}>{image.name}</div>
            ))
          ))}
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={chooseAdditionalImage} className="p-2 border rounded hover:border-green">Upload Images</button>
          <input type="file" onChange={updateNewImages} id="image-upload-edit-post" multiple={true} className="hidden" />
        </div>
        <SubmitFormButton label="Edit your Post" />
      </form>
    </div>
  );
};

export default EditPostForm;
