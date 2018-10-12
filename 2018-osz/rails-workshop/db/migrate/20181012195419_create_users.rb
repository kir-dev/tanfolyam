class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.date :date_of_birth
      t.text :introduce

      t.timestamps
    end
  end
end
