class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :address
      t.integer :postal_code
      t.string :city
      t.string :state
      t.string :dni_cif
      t.string :telephone

      t.timestamps
    end
  end
end
