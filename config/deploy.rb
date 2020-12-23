# config valid for current version and patch releases of Capistrano
lock "~> 3.14.1"

set :application, "gwt"
set :repo_url, "git@github.com:sebasalmeidam/gwt.git"

set :migration_role, [:app]
set :keep_releases, 3
set :pty,  false
set :rvm_ruby_version, '2.6.6@gwt6.1'
set :rvm_custom_path, '~/.rvm'

set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/master.key')
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/system public/uploads}

namespace :deploy do
  task :restart do
    on roles(:app), in: :sequence do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart
  after 'deploy', 'deploy:migrate'
end

namespace :logs do
  desc "tail rails logs" 
  task :tail_rails do
    on roles(:app) do
      execute "tail -f #{shared_path}/log/production.log"
    end
  end
end