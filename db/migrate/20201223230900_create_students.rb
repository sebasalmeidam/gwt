class CreateStudents < ActiveRecord::Migration[6.1]
  def change
    create_table :students do |t|
      t.string :torre_username, null: false, default: ""
      t.string :organization, null: false, default: ""
      t.string :location, null: false, default: ""
      t.string :name, null: false, default: ""

      t.timestamps
    end
  end
end
