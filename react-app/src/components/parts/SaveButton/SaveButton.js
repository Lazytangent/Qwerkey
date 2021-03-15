import { BookmarkBorder, Bookmark } from "@material-ui/icons";

const SaveButton = ({ save, isSaved }) => {
  return (
    <>
      <button onClick={save} className="outline-none p-2">
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
