import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "../../store";
import Post from "../Post";

const store = configureStore();

describe("The Post component", () => {
  describe("renders", () => {
    beforeEach(() => {
      const post = {
        id: 1,
        title: "Test post",
        body: "Test post body",
        created_at: "Wed, 02 March 2021 02:06:09 GMT",
        images: [],
        tags: [
          "Good",
          "New",
        ],
        community: {
          name: "Test Community",
        },
        user: {
          id: 1,
          name: "testuser",
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

    test("the Post title", () => {
      const title = screen.getByText("Test post");
      expect(title).toHaveTextContent("Test post");
    });

    test("the Post body", () => {
      const body = screen.getByText("Test post body");
      expect(body).toHaveTextContent("Test post body");
    });

    test("the Post timestamp", () => {
      const body = screen.getByText("by on Monday, March 1, 2021, 08:06:09 PM");
      expect(body).toHaveTextContent("by on Monday, March 1, 2021, 08:06:09 PM");
    });

    test("the Post tags", () => {
      const expectedTags = [
        "Good",
        "New",
      ];
      expectedTags.forEach(tag => {
        const tagText = screen.getByText(tag);
        expect(tagText).not.toBeNull();
      });
    });
  });
});
