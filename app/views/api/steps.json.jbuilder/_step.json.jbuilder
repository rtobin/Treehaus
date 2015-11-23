json.(step, :title, :body, :author_id, :todo_id, :due_ate, :done, :created_at, :updated_at)
json.assignees do
  step.assignees.each do |assignee|
    json.set! assignee.id do
      json.partial! 'api/users/user', assignee: assignee
    end
  end
end
