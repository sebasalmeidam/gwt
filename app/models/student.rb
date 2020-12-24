class Student < ApplicationRecord

  has_many :professionals, dependent: :destroy
  has_many :organizations, through: :professionals 

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
          student = Student.find_by(torre_username: username)
          student.update(name: name, location: location)
          p 'jobs'
          jobs = res['jobs']
          p jobs
          unless jobs.nil? || jobs.empty?
            p 'loop'
            jobs.each do |job|
              job_name = job['name']
              start_m = job["fromMonth"] ? job["fromMonth"] : ''
              start_y = job["fromYear"] ? job["fromYear"] : ''
              end_m = job["toMonth"] ? job["toMonth"] : ''
              end_y = job["toYear"] ? job["toYear"] : ''
              p 'before save'
              experience = Professional.find_or_create_by(title: job_name, start_month: start_m, start_year: start_y, end_month: end_m, end_year: end_y, student_id: student.id)
              p 'after save'
              job_organizations = job['organizations'].map{|org| org['name']}
              p job_organizations
              job_organizations.each{|org| business = Organization.find_or_create_by(name: org); OrganizationsProfessional.find_or_create_by(professional_id: experience.id , organization_id: business.id )}
            end
          end
          studies = res["education"]
          p 'next'
        else
          p 'error with response'
        end
      rescue
        p 'failed'
        next
      end
    end
    p 'end'
  end

end
