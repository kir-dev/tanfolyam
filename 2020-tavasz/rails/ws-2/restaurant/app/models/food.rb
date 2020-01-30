class Food < ApplicationRecord
  validates :name, length: {minimum:4, maximum: 12}
  validates :price, numericality: true
end
