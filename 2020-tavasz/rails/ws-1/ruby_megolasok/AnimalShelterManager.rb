require "./setup/Kutya.rb"
require "./setup/Cica.rb"
require "yaml"

animals = YAML.load(File.open("./animals.yaml"))

# 1. pat the first animal
#---
animals.first.pat

# 2. How many animals are in the shelter?
#---
# puts animals.length

# 3. list all animals names
#---
# animals.each do |animal|
#     puts animal.name
# end

# 4. list the first 10 animals name and age
# ---
# animals[0..9].each do |animal|
#     puts "name: #{animal.name}, age: #{animal.age} "
# end
# ---
# animals.take(10).each do |animal|
#     puts "name: #{animal.name}, age: #{animal.age} "
# end

#5. list the animals name  from the 23 index to the 28 index
# ---
# animals[23..28].each do |i|
#     puts animals[i].name
# end
# ---
# (23..28).each do |i|
#     puts animals[i].name
# end


#6. list the first 5 and last 3 animals name
# ---
#     (-3..4).each do |i|
#        puts animals[i].name
#     end

#7. find all animals that younger than 3 years
# ---
# young_animals = animals.select{|animal| animal.age<3}
# young_animals.each do |animal|
#     puts "name: #{animal.name}, age: #{animal.age}"
# end

#8. sum the ages of the animal
# ---
# sum = animals.reduce(0) {|sum,animal| sum = sum + animal.age}
# puts sum

#9. increase all animals age by 1
# ---
#older_animals = animals.map{|animal| animal.age+=1}

#10. Find all animal whose owners name starts with J
# ---
#  animals.select { |animal| animal.owner&.name&.start_with?("J") }.each do|animal|
#     puts "Animal name: #{animal.name} Owner name: #{animal.owner.name}"
#  end

#11. list all animals owner
# ---
# animals.each do |animal|
#     puts animal.owner&.name
# end

#12. list the differnt owner names
# ---
# owner_names = animals.map { |animal| animal.owner&.name }
# owner_names.delete_if { |name| !name.is_a?(String) }
# puts owner_names.uniq.sort

#13. order by owner's name
# ---
# selected_animals = animals.select { |animal| animal.owner&.name&.start_with?("J") }
# selected_animals.sort_by { |animal| animal.owner.name }.each do |animal|
#   puts "Owner name: #{animal.owner.name}, Animal name: #{animal.name}"
# end


