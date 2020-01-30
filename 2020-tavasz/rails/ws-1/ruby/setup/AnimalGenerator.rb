module AnimalGenerator
    require "./setup/Cica"
    require "./setup/Kutya"
    require "yaml"

    def self.create_specimens(species,names)
        cats=names.map do |cat_name|
            species.new(cat_name,rand(1..16))
        end
    end

    def self.create_animals
        names= Animal.names
        midpoint= names.length/2
        first_half_of_names=names[0..midpoint-1]
        second_half_of_names= names[midpoint..-1]

        animals=[]
        animals<<AnimalGenerator.create_specimens(Cica,first_half_of_names)
        animals<<AnimalGenerator.create_specimens(Kutya,second_half_of_names)
        animals.flatten!.shuffle!

        File.open('./animals.txt', 'w') { |f| f.write(YAML.dump(animals)) }
        "ok"
    end

end
AnimalGenerator.create_animals

