import { createContext, useContext, useState } from 'react';

const CollapsedSidebarContext = createContext();

export const useCollapsedSidebarContext = () =>
  useContext(CollapsedSidebarContext);

const CollapsedSidebarProvider = ({ children }) => {
  const [showCollapsedSidebar, setShowCollapsedSidebar] = useState(false);

  return (
    <CollapsedSidebarContext.Provider
      value={{ showCollapsedSidebar, setShowCollapsedSidebar }}
    >
      {children}
    </CollapsedSidebarContext.Provider>
  );
};

export default CollapsedSidebarProvider;
