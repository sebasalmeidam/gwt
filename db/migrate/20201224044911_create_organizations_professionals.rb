class CreateOrganizationsProfessionals < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations_professionals do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :professional, null: false, foreign_key: true

      t.timestamps
    end
  end
end
