require "rubygems"
require "sinatra"
require "json"

require "sinatra/reloader"

User = Struct.new :name, :homepage do

  def to_map
    map = Hash.new
    self.members.each { |m| map[m] = self[m] }
    map
  end

  def to_json(*a)
    to_map.to_json(*a)
  end

end


users = [
  User.new("geza", "http://geza.example.com"),
  User.new("jozsi", "http://jozsi.example.com"),
  User.new("bela", "http://bela.example.com"),
  User.new("jani", "http://jani.example.com"),
]

before do
  content_type 'application/javascript charset=utf-8'
end

get '/users' do
  callback = params[:callback] || "callback"

  "#{callback}(#{JSON.generate(users)});"
end

get '/evil' do
  "alert('this is from the server');"
end