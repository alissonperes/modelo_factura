# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_01_224119) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.integer "postal_code"
    t.string "city"
    t.string "state"
    t.string "dni_cif"
    t.string "telephone"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "invoices", force: :cascade do |t|
    t.bigint "customer_id", null: false
    t.integer "number"
    t.date "date"
    t.float "sub_total"
    t.boolean "vat"
    t.float "retention_vat"
    t.float "total"
    t.string "payment_method"
    t.integer "payment_due"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "due_date"
    t.boolean "payment_confirmed"
    t.index ["customer_id"], name: "index_invoices_on_customer_id"
  end

  create_table "items", force: :cascade do |t|
    t.bigint "invoice_id", null: false
    t.string "description"
    t.float "quantity"
    t.string "unit"
    t.float "price"
    t.float "total"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["invoice_id"], name: "index_items_on_invoice_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.integer "postal_code"
    t.string "state"
    t.string "city"
    t.string "nif"
    t.string "tlf"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "invoices", "customers"
  add_foreign_key "items", "invoices"
end
