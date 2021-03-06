class Record < ActiveRecord::Base
  validates(
    :name,
    :recordable_id,
    :recordable_type,
    presence: true
  )
  belongs_to :recordable, polymorphic: true
  belongs_to :user
  has_many :notifications
end
