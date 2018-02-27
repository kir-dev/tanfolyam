class Item < ActiveRecord::Base
  self.primary_key = :id

  belongs_to :flavor, foreign_key: :flavor

  def description
    "#{name}-től a #{room} szobából #{product_description}"
  end

  def product_description
    return 'szén' if product == 'coal'
    flavor_name = flavor ? flavor.name : ''
    "#{flavor_name} ízű dohány"
  end
end
