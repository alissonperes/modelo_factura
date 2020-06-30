# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' } { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke' movie: movies.first)

5.times do |x|
  Customer.create!(
    name: Faker::Name.name,
    address: Faker::Address.street_name + Faker::Address.street_address,
    postal_code: Faker::Address.zip,
    city: Faker::Address.city,
    state: Faker::Address.state,
    dni_cif: Faker::Code.rut,
    telephone: Faker::PhoneNumber.cell_phone
  )
end

$inv_num = 2020001
Customer.all.each do |c|
  6.times do
    c.invoices.create!(
      number: $inv_num,
      date: Date.today,
      sub_total: 0,
      vat: false,
      total: 0,
      payment_due: 10,
      due_date: Date.today + 10
    )
    $inv_num += 1
  end
end

Invoice.all.each do |i|
  5.times do
    i.items.create!(
      description: Faker::Coffee.blend_name,
      quantity: Faker::Number.number(digits: 2),
      price: Faker::Number.decimal(l_digits: 2, r_digits: 2)
    )
  end
end
