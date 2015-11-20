var Logout = window.Logout = React.createClass ({
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

  logoutAndRedirect: function (e) {
    e.preventDefault();
    AuthUtil.logout();
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
        <div className="logout jumbotron center-block" style={style}>
          <h3>Are you sure you want to sign out?</h3>
          <button onClick={this.toggleExpand}>Cancel</button>
          <button onClick={this.logoutAndRedirect}>Logout</button>
          <Link to="/signup">Create New Account</Link>
        </div>
      </div>
    );
  }
});