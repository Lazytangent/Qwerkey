import { ArrowUpward } from "@material-ui/icons";

const Upvote = () => {
  return (
    <>
      <button className="p-2 mx-2 border rounded hover:border-green active:bg-green hover:text-green">
        <ArrowUpward />
      </button>
    </>
  );
};

export default Upvote;
