class Team < ActiveRecord::Base
  validates :project_id, presence: true
  belongs_to :project

  has_many :memberships, foreign_key: :team_id, class_name: "TeamMembership"
  has_many :members, through: :memberships, source: :member


end
