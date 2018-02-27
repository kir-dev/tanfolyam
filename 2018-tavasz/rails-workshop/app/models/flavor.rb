class Flavor < ActiveRecord::Base
  self.primary_key = :id

  has_many :item, foreign_key: :id
end
