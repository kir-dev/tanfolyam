class ItemsController < ApplicationController

  def index
    @items = Item.all
  end

  def new
  end

  def create
    Item.create(params.require(:item).permit(:name, :quantity, :room, :product, :flavor, :price))
    redirect_to items_path, notice: 'Sikeres létrehozás!'
  end

  def buy
    @item = Item.find params[:id]
  end

  def confirm
    @item = Item.find params[:id]
    @item.quantity -= params[:quantity].to_i
    @item.save
    redirect_to items_path, notice: 'Sikeres Vásárlás!'
  end

end
