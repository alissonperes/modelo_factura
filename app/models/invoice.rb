class Invoice < ApplicationRecord
  belongs_to :customer
  has_many :items
  validates :number, :date, :payment_due, :customer_id, :date, presence: true
  validates :retention_vat, numericality: { less_than_or_equal_to: 100, only_integer: false }, allow_nil: true
  after_save :update_fields

  private

    def update_fields
      self.update_column(:sub_total, (self.items.sum("total")).round(2))
      self.vat ?
        self.update_column(:total, (self.sub_total * 1.21).round(2)) :
        self.update_column(:total, (self.sub_total).round(2))

      self.update_column(:due_date, self.date + self.payment_due)
    end
end
