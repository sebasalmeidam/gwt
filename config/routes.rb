Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  devise_for :users, path_names: { sign_in: 'sign_in', sign_up: 'sign_up' }

  post 'validate_students', to: 'students#validate_students'
  get 'dashboard', to: 'reports#dashboard'
  root to: "static_pages#home"
end
