import CreatePostModal from "../../CreatePostForm";
import DarkModeToggle from "../../DarkModeToggle";
import LogoutButton from "../../LogoutButton";
import NavButton from "../NavButton";

const UserMenu = ({ createPostBtnHandler }) => {
  return (
    <div className="absolute right-0 flex flex-col items-center p-2 rounded z-10 top-16 dark:bg-gray-600">
      <NavButton name="Create Post" onClick={createPostBtnHandler}>
        <CreatePostModal />
      </NavButton>
      <DarkModeToggle />
      <LogoutButton />
    </div>
  );
};

export default UserMenu;
