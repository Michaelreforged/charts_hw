# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Seller.destroy_all
Buyer.destroy_all

categoryArr = ['Desserts', 'Gourmet Appetizers', 'Entrees', 'Candy', 'Freeze Dried']

require 'faker'

10.times do 
  s = Seller.create(name:Faker::Name.name, email:Faker::Internet.email)
  s.products.create(name:Faker::Food.dish, price:Faker::Commerce.price(range:5..15), description:Faker::Food.description, category:categoryArr.sample, seller_id: s.id)
  s.products.create(name:Faker::Food.dish, price:Faker::Commerce.price(range:5..15), description:Faker::Food.description, category:categoryArr.sample, seller_id: s.id)
  s.products.create(name:Faker::Food.dish, price:Faker::Commerce.price(range:5..15), description:Faker::Food.description, category:categoryArr.sample, seller_id: s.id)
  s.products.create(name:Faker::Food.dish, price:Faker::Commerce.price(range:5..15), description:Faker::Food.description, category:categoryArr.sample, seller_id: s.id)
  s.products.create(name:Faker::Food.dish, price:Faker::Commerce.price(range:5..15), description:Faker::Food.description, category:categoryArr.sample, seller_id: s.id)
  10.times do 
    b = Buyer.create(name:Faker::Name.name, max_price:Faker::Commerce.price(range:5..15), desired_category:categoryArr.sample, seller_id:s.id)
  end
end


puts Seller.all.length 
puts Buyer.all.length 
puts Product.all.length 

