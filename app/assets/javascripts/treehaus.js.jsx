$(function () {
  var RouteHandler = ReactRouter.RouteHandler;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  EventEmitter.prototype._maxListeners = 100;

  var routes = (
      <Route path="/" component={App} >
        <Route path="/signup" component={SignupPage}/>
        <Route path="/signin" component={SigninPage}/>
        <Route
          path=":userID/projects"
          component={ProjectsHome}>
          <IndexRoute component={ProjectsIndex}/>
          <Route component={AssignmentsIndex} />
          <Route path="new" component={NewProjectForm}/>
          <Route path=":projectID" component={ProjectPage}>
            <Route path="settings" component={UpdateProjectForm}/>
            <Route path="todos" component={TodosPage}>
              <IndexRoute component={TodosIndex} />
              <Route path=":todoID" component={TodoShow} />
            </Route>
            <Route path="steps/:stepID" component={StepShow} />
            <Route path="members/:memberID" component={MemberPage} />
          </Route>
        </Route>
      </Route>
    );

    React.render(<Router>{routes}</Router>, document.getElementById('content'));
  // router.run(routes, function (Handler) {
  //   React.render(<Handler />, document.getElementById('content'));
  // });

  // <Route path="todos" component={TodosIndex} onEnter={requireAuth}>
  //   <Route path=":id" component={Todo} onEnter={requireAuth}>
  //     <Route path="steps" component={StepsIndex} onEnter={requireAuth}>
  //       <Route path=":id" component={Step} onEnter={requireAuth}/>
  //     </Route>
  //   </Route>
  // </Route>
  // });
});
