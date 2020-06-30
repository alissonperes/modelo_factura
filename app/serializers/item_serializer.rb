class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :invoice, :description, :quantity, :unit, :price, :total

  belongs_to :invoice
end
