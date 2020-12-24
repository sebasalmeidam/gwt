module Types
  class StudentType < Types::BaseObject
    description 'Query list of students, with jobs and organizations'
    
    field :id, ID, null: false
    field :name, String, null: true
    field :torre_username, String, null: false

  end
end