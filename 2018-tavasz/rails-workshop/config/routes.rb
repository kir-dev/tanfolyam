Rails.application.routes.draw do
  resources :items
  get '/items/buy/:id', to: 'items#buy'
  post '/items/confirm/:id', to: 'items#confirm', as: 'confirm'

  resources :flavors
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'items#index'
end
