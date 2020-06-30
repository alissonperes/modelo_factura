class Invoice < ApplicationRecord
  belongs_to :customer
  has_many :items
  validates :number, :date, :payment_due, :customer_id, :date, presence: true
  validates :retention_vat, numericality: { less_than_or_equal_to: 100, only_integer: false }, allow_nil: true
  after_save :update_total

  private
  def update_total
    self.update_column(:sub_total, self.items.sum("total"))
    self.vat ?
      self.update_column(:total, self.sub_total * 1.21) :
      self.update_column(:total, self.sub_total)
  end
end
