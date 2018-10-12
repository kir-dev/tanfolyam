json.extract! user, :id, :name, :date_of_birth, :introduce, :created_at, :updated_at
json.url user_url(user, format: :json)
