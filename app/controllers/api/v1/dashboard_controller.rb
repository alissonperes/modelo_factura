module Api
  module V1
    class DashboardController < ApplicationController
      def index
        invoices = Invoice.all.where(payment_confirmed: false).or(Invoice.all.where(payment_confirmed: nil)).order("due_date")
        last_invoice = Invoice.all.order("number").last.number

        render json: {:invoices => InvoiceSerializer.new(invoices), :last_number => last_invoice}
      end
    end
  end
end
