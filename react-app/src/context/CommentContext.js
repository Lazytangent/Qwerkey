import { createContext, useContext, useState } from 'react';

const CommentContext = createContext();

export const useCommentContext = () => useContext(CommentContext);

const CommentProvider = ({ children }) => {
  const [comment, setComment] = useState();

  return (
    <CommentContext.Provider value={{ comment, setComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
