Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :listings, only: [:create, :index, :update, :show]
      resources :bands, only: [:create, :index, :update, :show]
      resources :musicians, only: [:create, :index, :update, :show]
      post '/login', to: 'auth#create'
      get 'bands/profile', to: 'bands#profile'
      get 'musicians/profile', to: 'musicians#profile'
      
    end
  end
end