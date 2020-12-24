class Professional < ApplicationRecord
  has_many :organizations_professionals, dependent: :destroy
  has_many :organizations, through: :organizations_professionals
end
