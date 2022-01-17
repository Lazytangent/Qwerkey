import ModalProvider from './context/ModalContext';
import AuthProvider from './context/AuthContext';
import CreatePostProvider from './context/CreatePostContext';
import CommentProvider from './context/CommentContext';
import DarkModeProvider from './context/DarkModeContext';
import RetailerRatingProvider from './context/RetailerRatingContext';
import CollapsedSidebarProvider from './context/CollapsedSidebarContext';
import SearchProvider from './context/SearchContext';

const ContextProvider = ({ children }) => (
  <ModalProvider>
    <AuthProvider>
      <CreatePostProvider>
        <CommentProvider>
          <DarkModeProvider>
            <RetailerRatingProvider>
              <CollapsedSidebarProvider>
                <SearchProvider>{children}</SearchProvider>
              </CollapsedSidebarProvider>
            </RetailerRatingProvider>
          </DarkModeProvider>
        </CommentProvider>
      </CreatePostProvider>
    </AuthProvider>
  </ModalProvider>
);

export default ContextProvider;
