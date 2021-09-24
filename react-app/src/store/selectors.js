export const session = {
  user: () => (state) => state.session.user,
};

export const user = {
  byId: (id) => (state) => state.users.byIds[id],
};
