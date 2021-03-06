var TodoForm = React.createClass({

  componentDidMount: function () {
    ProjectStore.addTodosChangeListener(this._closeExpand);
  },

  componentWillUnMount: function () {
    ProjectStore.addTodosChangeListener(this._closeExpand);
  },

  getInitialState: function () {
    return {
      expanded: false,
      title: "",
      body: ""
    };
  },

  _toggleExpand: function (e) {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded});
  },

  _closeExpand: function () {
    this._resetState();
  },

  _resetState: function () {
    this.setState({
      expanded: false,
      title: "",
      body: ""
    });
  },

  _onFormChange: function (e) {
    var target = e.target;
    var attr = target.dataset.attr;
    this.state[attr] = target.value;
    this.forceUpdate();
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    var todoParams = {
      title: this.state.title,
      body: this.state.body,
      done: false,
      author_id: this.props.params.userID,
      project_id: this.props.params.projectID
    };
    TodoUtil.createTodo(todoParams);
  },

  _expandedContent: function () {
    var expanded = ""
    if (this.state.expanded) {
      var expanded = "-expanded"
    }
    return (
      <section className={"centered new-todo" + expanded}>
        <form className="todo-form" onSubmit={this._handleSubmit}>
          <fieldset className="todo-form-fieldset">
            <h3>New Goal</h3>
            <Errors key="todo-errors" errorid={"new-todo" + expanded}/>
            <div className="todo-input">
              <label>
                <input className="form-input"
                  data-attr="title"
                  placeholder="Give this goal a name..."
                  value={this.state.title}
                  onChange={this._onFormChange} />
              </label>
            </div>

            <div className="todo-input">
              <label>
                <textarea className="form-textarea"
                  data-attr="body"
                  placeholder="Add extra details about this goal..."
                  value={this.state.body}
                  onChange={this._onFormChange}/>
              </label>
            </div>

            <div className="todo-submit">
              <input
                type="submit"
                className="action-button"
                id="todo-submit-button"
                value="Add Goal"/>
              <span className="submit-button-alternative">or
                <a onClick={this._toggleExpand}>Cancel</a>
              </span>
            </div>
          </fieldset>
        </form>
      </section>
    );
  },

  render: function () {
    return (
      <div className="new-todo-dropdown">
        <button className="action-button new-goal"
          onClick={this._toggleExpand}>Make a new Goal</button>
        {this._expandedContent()}
      </div>
    );
  }
})
