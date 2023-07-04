export const session = {
  user: () => (state) => state.session.user,
};

export const users = {
  byId: (id) => (state) => state.users.byIds[id],
};

export const posts = {
  byId: (id) => (state) => state.posts.posts[id],
  byUser: (user) => (state) =>
    user ? user.posts.map((id) => state.posts.posts[id]) : [],
  all: () => (state) => state.posts.posts,
  max: () => (state) => state.posts.max,
  order: () => (state) => state.posts.order,
};

export const comments = {
  byUser: (user) => (state) =>
    user ? user.comments.map((id) => state.comments.comments[id]) : [],
  all: () => (state) => state.comments.comments,
};

export const retailers = {
  byId: (id) => (state) => state.retailers.retailers[id],
  byUser: (user) => (state) =>
    user ? user.retailers.map((id) => state.retailers.retailers[id]) : [],
  all: () => (state) => state.retailers.retailers,
  max: () => (state) => state.retailers.max,
};

export const meetups = {
  byId: (id) => (state) => state.meetups.meetups[id],
  byUser: (user) => (state) =>
    user ? user.meetups.map((id) => state.meetups.meetups[id]) : [],
  all: () => (state) => state.meetups.meetups,
  max: () => (state) => state.meetups.max,
};

export const communities = {
  all: () => (state) => state.communities,
};

export const sidebar = {
  popularCommunities: () => (state) =>
    state.sidebar.popular.map((id) => state.communities[id]),
  currentCommunity: () => (state) => state.communities[state.sidebar.community],
};

export const search = {
  results: () => (state) => state.search,
  posts:
    ({ posts = [] }) =>
    (state) =>
      posts.map((id) => state.posts.posts[id]),
  comments:
    ({ comments = [] }) =>
    (state) =>
      comments.map((id) => state.comments.comments[id]),
  retailers:
    ({ retailers = [] }) =>
    (state) =>
      retailers.map((id) => state.retailers.retailers[id]),
};
