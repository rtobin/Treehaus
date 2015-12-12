MemberUtil = {
  fetchMembers: function(projectID) {
    $.ajax({
      url: 'api/memberships',
      data: {membership: { project_id: projectID }},
      success: function(members) {
        debugger
        MemberActions.membersReceived(members);
      }
    });
  },

  createMember: function (memberParams) {
    $.post('api/memberships',
      {member: memberParams.member},
      function(member) {
        MemberActions.memberCreated(member);
      }
    ).fail(function () {
        var args = [].slice.call(arguments);
        UIActions.errorReport(JSON.parse(args[0].responseText));
      }
    );
  },


  destroyMember: function (memberParams) {
    $.ajax ({
      type: 'DELETE',
      url: 'api/memberships/' + memberParams.id,
      data: {id: memberParams.id},
      success: function () {
        MemberActions.memberDestroyed(memberParams.id);
      }
    });
  }
};