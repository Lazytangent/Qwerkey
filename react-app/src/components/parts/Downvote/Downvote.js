import { ArrowDownward } from "@material-ui/icons";

const Downvote = () => {
  return (
    <>
      <button className="p-2 mx-2 border rounded hover:border-purple active:bg-purple hover:text-purple">
        <ArrowDownward />
      </button>
    </>
  );
};

export default Downvote;
