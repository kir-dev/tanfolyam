class FlavorsController < ApplicationController
  def new
    @flavor = Flavor.new
  end

  def create
    Flavor.create(params.require(:flavor).permit(:name, :brand))
    redirect_to root_path, notice: 'Sikeres létrehozás!'
  end
end
