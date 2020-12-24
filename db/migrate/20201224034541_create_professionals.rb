class CreateProfessionals < ActiveRecord::Migration[6.1]
  def change
    create_table :professionals do |t|
      t.string :title
      t.string :start_month
      t.string :start_year
      t.string :end_month
      t.string :end_year
      t.references :student, index: true, foreign_key: true

      t.timestamps
    end
  end
end
