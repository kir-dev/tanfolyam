
# Típusok

123.class
"asd".class
n = 1234
"a szamunk: #{n}"
:valami

a = []
a = [1, 2, 3]
a[2]
a.push(4)
a.length()
a.length
a.push 10
a

b = {valami: 1, mas: 2}
b[:valami]
b[:harmadik] = 50
b
b.class

# Operátorok

b = 10 if true == false
b = 10 unless true == false
for item in a
  puts item
end
a ||= 10
d ||= 10

# Objektumorientáltság

# class.rb

geri = Student.new("Geri", 3)
geri.intelligence
geri.learn
geri.learn
geri.learn
geri.learners
Student.learners

# Monkey patching
# NEM, ILYET NEM CSINÁLUNK, CSAK ÉRDEKESSÉG

class Student
  def learn
    @intelligence -= 1
  end
end

geri.learn
geri.learn
geri.learn

# Blokkok

summa = 0
a.map { |elem| summa += elem }

# Kódmutogatások
# - Request processing
# - Model
