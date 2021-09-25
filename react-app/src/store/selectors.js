export const session = {
  user: () => (state) => state.session.user,
};

export const users = {
  byId: (id) => (state) => state.users.byIds[id],
};

export const posts = {
  byUser: (user) => (state) => user ? user.posts.map((id) => state.posts.posts[id]) : [],
};

export const comments = {
  byUser: (user) => (state) => user ? user.comments.map((id) => state.comments.comments[id]) : [],
};

export const retailers = {
  byUser: (user) => (state) => user ? user.retailers.map((id) => state.retailers.retailers[id]) : [],
  all: () => (state) => state.retailers.retailers,
  max: () => (state) => state.retailers.max,
};

export const meetups = {
  byUser: (user) => (state) => user ? user.meetups.map((id) => state.meetups.meetups[id]) : [],
};
