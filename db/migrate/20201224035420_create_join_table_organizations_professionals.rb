class CreateJoinTableOrganizationsProfessionals < ActiveRecord::Migration[6.1]
  def change
    create_join_table :organizations, :professionals do |t|
      #t.index [:organization_id, :professional_id]
      #t.index [:professional_id, :organization_id]
    end
  end
end
