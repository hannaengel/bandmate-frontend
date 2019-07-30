Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'bands/profile', to: 'bands#profile'
      get 'musicians/profile', to: 'musicians#profile'
      resources :listings, only: [:create, :index, :update, :show, :destroy]
      resources :bands, only: [:show, :create, :index, :update]
      resources :musicians, only: [:create, :index, :update, :show]
      post '/login', to: 'auth#create_band'
      post '/musicianlogin', to: 'auth#create_musician'
    
      
    end
  end
end