class Ingredient < ApplicationRecord
  has_and_belongs_to_many :foods
end
