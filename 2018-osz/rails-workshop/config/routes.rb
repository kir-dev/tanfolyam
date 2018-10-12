Rails.application.routes.draw do
  resources :groups do
    resources :memberships
  end
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
