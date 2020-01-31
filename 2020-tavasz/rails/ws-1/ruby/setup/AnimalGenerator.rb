module AnimalGenerator
  require "./setup/Cica"
  require "./setup/Kutya"
  require "yaml"

  def self.create_specimens(species, names)
    cats = names.map do |cat_name|
      species.new(cat_name, rand(1..16))
    end
  end

  def self.keepable_animal_num(animal_num, owner_num)
    res = animal_num - owner_num
    if (res > 3)
      return 3
    end
    res
  end

  def self.animal_owner_distribution(animals, owners)
    remaining_animals = animals.length

    dist = owners.map.with_index { |n, i|
      num = rand(1..keepable_animal_num(remaining_animals, owners.length - 1 - i))
      remaining_animals -= num
      num
    }

    dist
  end

  def self.create_animals
    owners = Owner.owner_names.map { |owner_name|
      Owner.new(owner_name.delete("\n"))
    }
    names = Animal.names.map { |name| name.delete("\n") }
    midpoint = names.length / 2
    first_half_of_names = names[0..midpoint - 1]
    second_half_of_names = names[midpoint..-1]

    animals = []
    animals << AnimalGenerator.create_specimens(Cica, first_half_of_names)
    animals << AnimalGenerator.create_specimens(Kutya, second_half_of_names)
    animals.flatten!.shuffle!

    dist = animal_owner_distribution(animals, owners)
    animals_index = 0
    owners.each.with_index do |owner, dist_index|
      dist[dist_index].times do
        animals[animals_index].owner = owner
        animals_index += 1
      end
    end
    animals.shuffle!

    File.open("./animals.txt", "w+") { |f| f.write(YAML.dump(animals)) }
    animals
  end
end

AnimalGenerator.create_animals
