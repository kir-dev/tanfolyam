   require './setup/PluralizableString.rb'

class Animal
    attr_accessor :name, :age

    def initialize(name="Aminal",age=4,hungry=true)
        @name=name
        @age=age    
    end

    def pat
        raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
    end


    def self.names
        input= File.open('animal_names.txt').read() 
        input.split(' ').select{|n| !n.include?('.')}
    end

end
