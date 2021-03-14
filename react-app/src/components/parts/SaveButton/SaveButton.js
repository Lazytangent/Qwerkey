import { BookmarkBorder, Bookmark } from "@material-ui/icons";

const SaveButton = ({ save, isSaved }) => {
  return (
    <>
      <button onClick={save}>
        {isSaved ? (
          <Bookmark />
        ) : (
          <BookmarkBorder />
        )}
      </button>
    </>
  );
};

export default SaveButton;
