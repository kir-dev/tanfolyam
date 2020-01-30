require './setup/Kutya.rb'
require './setup/Cica.rb'
require 'yaml'

animals = YAML.load(File.open('./setup/animals.txt'))

#1. pat the first animal
# animals.first.pat
#---
#. How many animals are in the shelter?
    # puts animals.length
# ---
#2. list all animals names
    # animals.each do | animal|
    #     puts animal.name
    # end
#---
# 3. list the first 10 animals name and age
    # animals.take(10).each do | animal | 
    #     puts "name: #{animal.name}, age: #{animal.age} "
    # end
# ---
    # list the animals name  from the 23 index to the 28 index

#     (23..28).each do |i|
#        puts animals[i].name
#     end
# ---
    # list the first 5 and last 3 animals name
 
#     (-3..4).each do |i|
#        puts animals[i].name
#     end
# ---

    #find all animals that younger than 3 years

    # young_animals=animals.select{|animal| animal.age<3}

    # young_animals.each do |animal|
    #     puts "name: #{animal.name}, age: #{animal.age} "
    # end
# ---   
    # sum the ages of the animals
    # sum= animals.reduce(0) {|sum,animal| sum= sum +animal.age }
    # puts sum
# ---
    #increase all animals age by 1

    #  older_animals= animals.map{|animal| animal.age+=1}
    #  sum= animals.reduce(0) {|sum,animal| sum= sum +animal.age }
    #  puts sum