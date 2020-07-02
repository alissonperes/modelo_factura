Rails.application.routes.draw do
  get 'dashboard/index'
  root "pages#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :invoices do
        resources :items
      end
      resources :customers
      resources :dashboard do
        resources :invoices
      end
    end
  end
  get '*path', to: 'pages#index', via: :all
end
