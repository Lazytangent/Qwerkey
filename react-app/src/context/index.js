import ModalProvider from './ModalContext';
import AuthProvider from './AuthContext';
import CreatePostProvider from './CreatePostContext';
import CommentProvider from './CommentContext';
import DarkModeProvider from './DarkModeContext';
import RetailerRatingProvider from './RetailerRatingContext';
import CollapsedSidebarProvider from './CollapsedSidebarContext';
import SearchProvider from './SearchContext';

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
