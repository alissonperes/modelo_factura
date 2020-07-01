class CustomerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :address, :postal_code, :city, :state, :dni_cif, :telephone, :invoices

  has_many :invoices
end
