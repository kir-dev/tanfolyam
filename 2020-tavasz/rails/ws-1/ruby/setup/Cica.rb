require './setup/Animal.rb'
class Cica<Animal
 
    def pat
        puts "#{@name} is purring!"
    end

    def sleep (duration)
        puts "#{@name} has slept for #{duration} #{"hour".pluralize(duration)}!"
    end 

end