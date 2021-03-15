import { BookmarkBorder, Bookmark } from "@material-ui/icons";

const SaveButton = ({ save, isSaved }) => {
  return (
    <>
      <button onClick={save} className="p-2 rounded outline-none duration-100 hover:bg-green">
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
