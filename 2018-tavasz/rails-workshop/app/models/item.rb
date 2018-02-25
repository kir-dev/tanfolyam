class Item < ActiveRecord::Base
  self.primary_key = :id

  def description
    "#{name}-től a #{room} szobából #{product_description}"
  end

  def product_description
    return 'szén' if product == 'coal'
    "#{flavor} ízű dohány"
  end
end
