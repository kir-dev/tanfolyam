class Group < ApplicationRecord
  has_many :memberships

  def join!(user)
    Membership.create(group: self, user: user, admin: false)
  end

  def can_join?(user)
      user && !member?(user)
  end

  def member?(user)
    memberships.find { |m| m.user == user }
  end
end
