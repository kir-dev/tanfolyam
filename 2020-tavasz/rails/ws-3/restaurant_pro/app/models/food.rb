class Food < ApplicationRecord

  has_one_attached :photo
  has_and_belongs_to_many :ingredients

  validates :name, length: {minimum: 4, maximum: 30}
  validates :price, numericality: true

end
