class Person
end

class Student < Person

  @@learners = 0

  def initialize(name, intelligence)
    @intelligence = intelligence
    @@learners += 1
  end

  def learn
    @intelligence += 5
  end

  def self.count
    @@learners
  end

end
