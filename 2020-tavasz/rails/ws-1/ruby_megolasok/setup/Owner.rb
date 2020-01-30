class Owner
  attr_accessor :name

  def initialize(name = "Owner Oskar")
    @name = name
  end

  def self.owner_names
    File.open("./setup/owner_names.txt").readlines
  end
end
