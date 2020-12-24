module Types
  class QueryType < Types::BaseObject

    field :students, [Types::StudentType], null: true do
      description "Students query"
      argument :organization, String, required: false
    end
    def students(organization:)
      if organization.present?
        return Student.where(organization: organization).includes(professionals: :organizations)
      end
      Student.includes(professionals: :organizations)
    end

    field :is_working, Integer, null: false do
      description "Count of students that don't have end dates in jobs"
      argument :organization, String, required: false
    end

    def is_working(organization:)
      students = Student.where(organization: organization).includes(professionals: :organizations).where(professionals: {end_year: ''})
      return students.size
    end

    field :not_working, Integer, null: false do
      description "Count of students that don't have end dates in jobs"
      argument :organization, String, required: false
    end

    def not_working(organization:)
      students = Student.where(organization: organization).includes(professionals: :organizations).where.not(professionals: {end_year: ''})
      return students.size
    end

    field :company_list, [String], null: false do
      description "Count of students that don't have end dates in jobs"
      argument :organization, String, required: false
    end

    def company_list(organization:)
      students = Student.where(organization: organization).map(&:id)
      organization_list = Organization.includes(:professionals).where(professionals: {student_id: students}).map(&:name)
      return organization_list
    end

  end
end
