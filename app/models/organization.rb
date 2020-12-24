class Organization < ApplicationRecord
  has_many :organizations_professionals, dependent: :destroy
  has_many :professionals, through: :organizations_professionals
end
