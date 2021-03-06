(function (root) {
  var _user = {};
  _user.email = "not signed in";
  var CHANGE_EVENT = "change";
  var UPDATE_USER_EVENT = "update_user_event";

  var signOutUser = function () {
    _user = {};
  };

  var signInUser = function (user) {
    _user = user;
  };

  var UserStore = root.UserStore = $.extend({}, BaseStore, {

    currentUser: function () {
      return $.extend({}, _user);
    },

    currentUserName: function () {
      return _user.name || _user.email.split("@")[0];
    },

    isSignedIn: function () {
      return (typeof _user.id !== "undefined");
    },

    updateUserData: function (userData) {
      $.extend(_user, userData);
    },

    addUpdateUserListener: function (callback) {
      this.on(UPDATE_USER_EVENT, callback);
    },

    removeUpdateUserListener: function (callback) {
      this.removeListener(UPDATE_USER_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register( function (payload){
      switch(payload.actionType){
        case SessionConstants.SIGNIN_USER:
          // AppDispatcher.waitFor([ProjectStore.dispatcherID]);
          if (payload.user.id) {
            signInUser(payload.user);
          }
          UserStore.emitChange();
          break;
        case SessionConstants.SIGNOUT_USER:
          signOutUser();
          UserStore.emitChange();
          break;
        case UserConstants.RECEIVED_USER_DATA:
          UserStore.updateUserData(payload.userData);
          UserStore.emit(UPDATE_USER_EVENT)
          break;
        default:
          break;
      }
    })
  });
})(this);
