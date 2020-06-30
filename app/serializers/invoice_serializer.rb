class InvoiceSerializer
  include FastJsonapi::ObjectSerializer
  attributes :customer_id, :number, :date, :sub_total, :vat, :retention_vat, :total, :payment_method, :payment_due

  belongs_to :customer
  has_many :items
end
