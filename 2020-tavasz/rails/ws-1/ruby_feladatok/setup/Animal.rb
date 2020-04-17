require "./setup/PluralizableString.rb"
require "./setup/Owner"

class Animal
  attr_accessor :name, :age, :owner

  def initialize(name = "Aminal", age = 4, owner = nil)
    @name = name
    @age = age
    @owner = owner
  end

  def pat
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  def self.names
    input = File.open("./setup/animal_names.txt").readlines
  end
end
