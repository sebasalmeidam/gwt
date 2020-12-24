task :get_users_genome => :environment do
  usernames = ENV['USERNAMES'].split(',')
  Student.get_genome(usernames)
end