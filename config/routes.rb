Rails.application.routes.draw do

  devise_for :users, path_names: { sign_in: 'sign_in', sign_up: 'sign_up' }
  root to: "static_pages#home"
end
