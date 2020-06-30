class Customer < ApplicationRecord
  has_many :invoices
  validates :name, :address, :postal_code, :city, :state, :dni_cif, presence: true
end
