require './setup/Animal.rb'
class Kutya<Animal

    def pat
        puts "#{@name} makes happy dog noise!"
    end

    def walk(distance)
        puts "You walked #{name} for #{distance} #{"kilometer".pluralize(distance)}"
    end    
end

