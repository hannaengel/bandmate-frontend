Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :bands, only: [:create, :index, :update]
      post '/login', to: 'auth#create'
      get '/profile', to: 'bands#profile'
      get '/bands', to: 'bands#index'
     
    end
  end
end