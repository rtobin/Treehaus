var Signout = window.Signout = React.createClass ({
  mixins: [ReactRouter.History],

  getInitialState: function () {
      return {
        expanded: false
      };
  },

  toggleExpand: function (e) {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded});
  },

  redirectAfterSignout: function () {
    this.history.pushState(null, "/projects");
  },

  signout: function (e) {
    e.preventDefault();
    AuthUtil.signout(this.redirectAfterSignout);
  },

  render: function () {
    var Link = ReactRouter.Link;
    var style = {};
    if (!this.state.expanded) {
      style.display = 'none';
    }
    return (
      <div>
        <button onClick={this.toggleExpand}>Sign out</button>
        <div className="signout jumbotron center-block" style={style}>
          <h3>Are you sure you want to sign out?</h3>
          <button onClick={this.toggleExpand}>Cancel</button>
          <button onClick={this.signout}>Signout</button>
          <Link to="/signup">Create New Account</Link>
        </div>
      </div>
    );
  }
});
