import { createContext, useState, useContext } from 'react';

const CreatePostContext = createContext();

export const useCreatePostContext = () => useContext(CreatePostContext);

const CreatePostProvider = ({ children }) => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  return (
    <CreatePostContext.Provider
      value={{ showCreatePostModal, setShowCreatePostModal }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};

export default CreatePostProvider;
