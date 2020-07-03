module Api
  module V1
    class DashboardController < ApplicationController
      def index
        invoices = Invoice.all.where(payment_confirmed: false).or(Invoice.all.where(payment_confirmed: nil)).order("due_date")

        render json: InvoiceSerializer.new(invoices).serialized_json
      end
    end
  end
end
