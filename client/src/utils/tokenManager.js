export const tokenManager = {
  token: null,
  getToken: function () {
    return this.token;
  },
  setToken: function (newToken) {
    this.token = newToken;
  },
};
