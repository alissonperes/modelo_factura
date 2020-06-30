class CreateInvoices < ActiveRecord::Migration[6.0]
  def change
    create_table :invoices do |t|
      t.references :customer, null: false, foreign_key: true
      t.integer :number
      t.date :date
      t.float :sub_total
      t.boolean :vat
      t.float :retention_vat
      t.float :total
      t.string :payment_method
      t.integer :payment_due

      t.timestamps
    end
  end
end
