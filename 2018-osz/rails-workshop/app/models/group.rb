class Group < ApplicationRecord
  def join!(user)
    Membership.create(group: self, user: user, admin: false)
  end
end
