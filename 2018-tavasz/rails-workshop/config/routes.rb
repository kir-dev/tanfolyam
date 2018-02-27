Rails.application.routes.draw do

  get '/items/unavaliable', to: 'items#unavaliable', as: 'unavaliable_items'
  delete '/items/unavaliable', to: 'items#delete_unavaliable', as: 'delete_unavaliable_items'

  resources :items
  get '/items/buy/:id', to: 'items#buy'
  post '/items/confirm/:id', to: 'items#confirm', as: 'confirm'

  resources :flavors

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'items#index'
end
