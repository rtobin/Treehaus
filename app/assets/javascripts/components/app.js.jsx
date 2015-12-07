var App = React.createClass({
  mixins: [ReactRouter.History],

  _getFullState: function () {
    return {
      currentUser: UserStore.currentUser(),
      projects: ProjectStore.all(),
      location: this.props.location
      // notifications
    };
  },

  getInitialState: function () {
    return this._getFullState();
  },

  _ensureSignedIn: function () {
    if (!UserStore.isSignedIn() && this.props.location.pathname !== "/signup") {
      this.history.pushState(null, "/signin");
    }
  },

  _onChange: function () {
    this.setState(this._getFullState());
    this._ensureSignedIn();
  },

  componentWillMount: function () {
    var stores = [UserStore, ProjectStore];
    stores.forEach(function(store) {
      store.addChangeListener(this._onChange);
    }, this);
    SessionUtil.fetchCurrentUser();
  },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
    this.stores.forEach(function(store) {
      store.removeChangeListener(this._onChange);
    }, this);
  },

  render: function () {
    var renderedChildren = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {...this.state});
    }, this);

    return (
      <div className="app">
        {renderedChildren}
      </div>
    );
  }
});
