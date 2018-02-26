class FlavorsController < ApplicationController
  def new
    @flavor = Flavor.new
  end

  def create
    raise
  end
end
