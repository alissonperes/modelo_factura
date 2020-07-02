class AddPaymentConfirmedToInvoices < ActiveRecord::Migration[6.0]
  def change
    add_column :invoices, :payment_confirmed, :boolean
  end
end
