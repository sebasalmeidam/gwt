server YAML.load(`rails credentials:show`)["server"]["name"], user: YAML.load(`rails credentials:show`)["server"]["user"], roles: %w{app db web}
set :deploy_to, '~/sites/gwt'
set :branch, 'master'

set :enable_ssl, false