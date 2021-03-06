class Todo < ActiveRecord::Base
  validates :title, :project_id, :author_id, presence: true
  validates :done, inclusion: [true, false], default: false
  validates_uniqueness_of :title, scope: :project_id

  after_initialize { self.done = false if self.done.nil? }

  has_many :steps, dependent: :destroy
  has_many :step_assignments, through: :steps, source: :step_assignments
  # has_many :assignees
  belongs_to :author, foreign_key: :author_id, class_name: "User"
  belongs_to :project

  has_many :records, as: :recordable
  has_many :comments, as: :commentable


  def all_assignees
    # User.includes (:assigned_steps)
    #     .where(assigned_steps: { todo_id: self.id })
    #     .distinct
    []
  end

  def is_done?
    self.steps.all? { |step| step.done }
  end

  def progress
    step_count = self.steps.count
    done_count = self.steps.select { |step| step.done }.count
    {step_count: step_count, done_count: done_count}
  end

  def set_done
    self.steps.each do |step|
      step.set_done
    end
  end
end
