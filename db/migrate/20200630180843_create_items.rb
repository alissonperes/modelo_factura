class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.references :invoice, null: false, foreign_key: true
      t.string :description
      t.float :quantity
      t.string :unit
      t.float :price
      t.float :total

      t.timestamps
    end
  end
end
