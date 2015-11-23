UserActions = {
  signinUser: function (user) {
    AppDispatcher.dispatch({
      actionType: AuthConstants.SIGNIN_USER,
      user: user
    });
  },

  signoutUser: function () {
    AppDispatcher.dispatch({
      actionType: AuthConstants.SIGNOUT_USER
    });
  },

  errorReport: function (errors) {
    AppDispatcher.dispatch({
      actionType: AuthConstants.AUTH_ERROR,
      errors: errors
    });
  }
};