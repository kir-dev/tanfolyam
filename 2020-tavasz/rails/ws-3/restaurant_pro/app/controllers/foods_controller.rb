class FoodsController < ApplicationController
  before_action :authenticate_user!, only: %i[edit destroy]

  def about
  end

  def index
    @foods = Food.all
  end

  def new
    @food = Food.new
  end

  def create
    @food = Food.new(food_params)
    if @food.save
      redirect_to foods_path
    else
      render 'new'
    end
  end

  def show
    @food = Food.find(params[:id])
  end

  def edit
    @food = Food.find(params[:id])
  end

  def update
    @food = Food.find(params[:id])
    if @food.update(food_params)
      redirect_to @food
    else
      render 'edit'
    end
  end

  def destroy
    food = Food.find(params[:id])
    food.destroy
    redirect_to foods_path
  end

  private

  def food_params
    parameters = params.require('food').permit('name', 'price', 'photo', ingredients: [])
    parameters[:ingredients] = Ingredient.where(id: parameters[:ingredients]).to_a
    parameters
  end
end
