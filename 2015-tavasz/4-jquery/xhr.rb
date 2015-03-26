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

get "/" do
  erb :index
end

get "/users" do
  JSON.generate users
end

post '/users' do
  u = JSON.parse request.body.read
  users << User.new(u["name"], u["homepage"])

  {:success => true}.to_json
end

__END__

@@ layout
<html>
<head>
  <title>XHR</title>
</head>
<body>
  <%= yield %>
</body>
</html>

@@ index
<h1>Index</h1>