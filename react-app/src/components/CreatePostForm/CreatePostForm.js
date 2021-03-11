import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createPost } from '../../store/posts';
import { getCommunities } from "../../store/communities";
import { useCreatePostContext } from '../../context/CreatePostContext';
import FormTitle from '../parts/FormTitle';
import FormErrors from '../parts/FormErrors';
import InputField from '../parts/InputField';
import SubmitFormButton from '../parts/SubmitFormButton';

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const communities = useSelector(state => state.communities);

  const { setShowCreatePostModal } = useCreatePostContext();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [communityId, setCommunityId] = useState(1);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setIsLoaded(true);
    }
  }, [user]);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const updateImages = (e) => {
    const files = e.target.files;
    if (files) setImages(prev => [...prev, files]);
  }

  const chooseAdditionalImage = () => {
    document.getElementById("image-upload-create-post").click();
  };

  const updateCommunityId = (e) => {
    setCommunityId(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (body || images.length) {
      const post = await dispatch(createPost({ title, body, images, userId: user.id, communityId }));
      if (!post.errors) {
        setShowCreatePostModal(false);
      } else {
        setErrors(post.errors);
      }
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded dark:text-gray-50 dark:bg-gray-800 md:w-96">
      <form onSubmit={submitHandler}>
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
        />
        <div className="flex flex-col items-center pb-2">
          <label htmlFor="community-select" className="mb-2">Select a Community</label>
          <select id="community-select" className="p-2 border rounded outline-none focus:border-green dark:bg-gray-800 dark:text-gray-50 border-gray-50" value={communityId} onChange={updateCommunityId}>
            {Object.values(communities).map(community => (
              <option value={community.id} key={community.id}>{community.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center">
          <h5>Images Chosen</h5>
          {images && images.map(fileList => (
            Array.from(fileList).map(image => (
              <div key={image.name}>
                {image.name}
              </div>
            ))
          ))}
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={chooseAdditionalImage} className="p-2 border rounded duration-300 hover:border-green">Upload Images</button>
          <input type="file" onChange={updateImages} id="image-upload-create-post" multiple={true} className="hidden" />
        </div>
        <SubmitFormButton label="Create a Post" />
      </form>
    </div>
  );
};

export default CreatePostForm;
