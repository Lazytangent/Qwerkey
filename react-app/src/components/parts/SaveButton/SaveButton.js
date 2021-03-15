import { BookmarkBorder, Bookmark } from "@material-ui/icons";

const SaveButton = ({ save, isSaved }) => {
  return (
    <>
      <button onClick={save} className="p-2 rounded outline-none hover:bg-green">
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
