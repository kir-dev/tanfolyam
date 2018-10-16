class Post < ApplicationRecord
  belongs_to :group
  belongs_to :user

  def can_destroy?(user)
    self.group.admin?(user)
  end
end
