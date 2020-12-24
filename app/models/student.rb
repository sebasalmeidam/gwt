class Student < ApplicationRecord

  def self.get_genome(usernames)
    p 'starting'
    usernames.each do |username|
      p 'getting genome information'
      url = 'https://bio.torre.co/api/bios/' + "#{username}"
      uri = URI.parse(url)
      http = Net::HTTP.new(uri.host, uri.port)
      request = Net::HTTP::Get.new(uri.request_uri)
      http.use_ssl = (uri.scheme == "https")
			
      begin
        response = http.request(request)
        
        if JSON.parse(response.body)
          res = JSON.parse(response.body)
          person = res["person"]
          name = person ? person["name"] : ''
          location = person['location'] ? person["location"]['name'] : ''
          p 'before update'
          p name
          p location
          Student.find_by(torre_username: username).update(name: name, location: location)
          jobs = res['jobs']
          studies = res["education"]
          p 'next'
          return true
        else
          p 'error with response'
          return false
        end
      rescue
        p 'failed'
        next
      end
    end
  end

end
