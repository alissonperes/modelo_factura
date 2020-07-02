module Api
  module V1
    class DashboardController < ApplicationController
      def index
        invoices = Invoice.all.where(payment_confirmed: false || nil)

        render json: InvoiceSerializer.new(invoices).serialized_json
      end
    end
  end
end
