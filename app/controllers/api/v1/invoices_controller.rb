module Api
  module V1
    class InvoicesController < ApplicationController
      protect_from_forgery with: :null_session
      def index
        invoices = Invoice.all.order("due_date")

        render json: InvoiceSerializer.new(invoices).serialized_json
      end

      def show
        invoice = Invoice.find(params[:id])

        render json: InvoiceSerializer.new(invoice).serialized_json
      end

      def create
        invoice = Invoice.new(invoice_params)

        if invoice.save
          render json: InvoiceSerializer.new(invoice, options).serialized_json
        else
          render json: {error: invoice.errors.messages}, status: 422
        end
      end

      def update
        invoice = Invoice.find(params[:id])

        if invoice.update(invoice_params)
          render json: InvoiceSerializer.new(invoice, options).serialized_json
        else
          render json: {error: invoice.errors.messages}, status: 422
        end
      end

      def destroy
        invoice = Invoice.find(params[:id])

        if invoice.destroy
          head :no_content
        else
          render json: {error: invoice.errors.messages}, status: 422
        end
      end

      private
      def invoice_params
        params.require(:invoice).permit(:number, :date, :payment_due, :customer_id, :date)
      end

      def options
        @options ||= { include:  %i[items]}
      end
    end
  end
end
