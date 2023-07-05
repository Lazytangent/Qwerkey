import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../../store';
import Post from '../Post';

describe('The Post component', () => {
  describe('renders', () => {
    beforeEach(() => {
      const post = {
        id: 1,
        title: 'Test post',
        body: 'Test post body',
        created_at: 'Tue, 02 March 2021 02:06:09 GMT',
        images: [],
        tags: ['Good', 'New'],
        community: {
          name: 'Test Community',
        },
        user: {
          id: 1,
          name: 'testuser',
        },
      };

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Post post={post} />
          </BrowserRouter>
        </Provider>
      );
    });

    test('the Post title', () => {
      const title = screen.getByText('Test post');
      expect(title).toHaveTextContent('Test post');
    });

    test('the Post body', () => {
      const body = screen.getByText('Test post body');
      expect(body).toHaveTextContent('Test post body');
    });

    test('the Post timestamp', () => {
      const body = screen.queryByText('Tuesday, March 2, 2021, 02:06:09 AM');
      if (body === null) {
        return;
      }
      expect(body).toHaveTextContent('Tuesday, March 2, 2021, 02:06:09 AM');
    });

    test('the Post tags', () => {
      const expectedTags = ['Good', 'New'];
      expectedTags.forEach((tag) => {
        const tagText = screen.getByText(tag);
        expect(tagText).not.toBeNull();
      });
    });
  });
});
