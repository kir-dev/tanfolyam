Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #
  resources :foods
  get '/about', to: 'foods#about'
  root to: 'foods#index'
end
