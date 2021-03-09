import { useCollapsedSidebarContext } from "../../context/CollapsedSidebarContext";

const CollapsedSidebar = () => {
  const { showCollapsedSidebar } = useCollapsedSidebarContext();

  return (
    <div className={`fixed top-0 left-0 ${showCollapsedSidebar ? "w-40" : "w-0"} h-screen pt-12 overflow-x-hidden bg-gray-100 z-1 duration-500`}>
      <h3>Placeholder for CollapsedSidebar</h3>
    </div>
  );
};

export default CollapsedSidebar;
