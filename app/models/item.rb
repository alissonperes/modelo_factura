class Item < ApplicationRecord
  belongs_to :invoice
  validates  :invoice_id, :description, :quantity, :price, presence: true
  after_save :update_invoice_total

  private
  def update_invoice_total
    self.update_column(:total, (self.quantity * self.price).round(2))

    self.invoice.update_column(:sub_total, (self.invoice.items.sum("total")).round(2))

    self.invoice.vat ?
      self.invoice.update_column(:total, (self.invoice.sub_total * 1.21).round(2)) :
      self.invoice.update_column(:total, self.invoice.sub_total)
  end
end
