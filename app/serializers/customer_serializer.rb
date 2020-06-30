class CustomerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :address, :postal_code, :city, :state, :dni_cif, :telephone

  has_many :invoices
end
