export const session = {
  user: () => (state) => state.session.user,
};

export const users = {
  byId: (id) => (state) => state.users.byIds[id],
};

export const posts = {
  byId: (id) => (state) => state.posts.posts[id],
  byUser: (user) => (state) => user ? user.posts.map((id) => state.posts.posts[id]) : [],
  all: () => (state) => state.posts.posts,
  max: () => (state) => state.posts.max,
  order: () => (state) => state.posts.order,
};

export const comments = {
  byUser: (user) => (state) => user ? user.comments.map((id) => state.comments.comments[id]) : [],
};

export const retailers = {
  byId: (id) => (state) => state.retailers.retailers[id],
  byUser: (user) => (state) => user ? user.retailers.map((id) => state.retailers.retailers[id]) : [],
  all: () => (state) => state.retailers.retailers,
  max: () => (state) => state.retailers.max,
};

export const meetups = {
  byId: (id) => (state) => state.meetups.meetups[id],
  byUser: (user) => (state) => user ? user.meetups.map((id) => state.meetups.meetups[id]) : [],
  all: () => (state) => state.meetups.meetups,
};

export const communities = {
  all: () => (state) => state.communities,
};
