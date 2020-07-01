Rails.application.routes.draw do
  root "pages#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :invoices do
        resources :items
      end
      resources :customers
    end
  end
  get '*path', to: 'pages#index', via: :all
end
