CommentUtil = {
  fetchComments: function(commentableParams) {
    $.ajax({
      url: "api/comments",
      data: {
        commentable_id: commentableParams.commentable_id,
        commentable_type: commentableParams.commentable_type
      },
      success: function(comments) {
        CommentActions.commentsReceived(comments);
      }
    });
  },

  createComment: function (commentParams) {
    $.post("api/comments",
      {
        comment: commentParams.comment,
        project_id: commentParams.projectID
      },
      function(comment) {
        CommentActions.commentCreated(comment);
      }
    ).fail(function () {
        var args = [].slice.call(arguments);
        var errorid = "new-comment";
        UIActions.errorReport(JSON.parse(args[0].responseText), errorid);
      }
    );
  },

  updateComment: function (commentParams) {
    $.ajax ({
      type: 'PUT',
      url: 'api/comments/' + commentParams.id,
      data: {
        id: commentParams.id,
        comment: commentParams
      },
      success: function (comment) {
        CommentActions.commentUpdated(comment);
      }
    }).fail(function () {
        var args = [].slice.call(arguments);
        var errorid = "update-comment";
        UIActions.errorReport(JSON.parse(args[0].responseText), errorid);
      }
    );
  },

  destroyComment: function (commentParams) {
    $.ajax ({
      type: 'DELETE',
      url: 'api/comments/' + commentParams.id,
      data: {id: commentParams.id},
      success: function () {
        CommentActions.commentDestroyed(commentParams.id);
      }
    });
  }


};
