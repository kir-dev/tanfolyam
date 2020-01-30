require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ingredient_num = 10
puts 'Generating ingredients: '
ingredient_num.times do |index|
  Ingredient.create(name: Faker::Food.ingredient)
  puts "#{index + 1}/#{ingredient_num}"
end

food_num = 20
puts 'Generating foods: '
food_num.times do |index|
  ingredients = ingredient_num.times.to_a.sample(rand(1..ingredient_num))
  ingredients = Ingredient.where(id: ingredients)
  Food.create(name: Faker::Food.dish, price: rand(100..1000), ingredients: ingredients)
  puts "#{index + 1}/#{food_num}"
end

