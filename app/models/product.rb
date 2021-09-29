class Product < ApplicationRecord
  belongs_to :seller 

# SELECT p.name, p.description, p.price, p.category, s.name AS sellers_name, s.email
# FROM products AS p 
# LEFT JOIN sellers AS s 
# ON p.seller_id = s.id 

  def self.w_seller
    select('p.name, p.description, p.price, p.category, p.id as product_id , s.name AS sellers_name, s.email, p.seller_id')
    .from('products AS p')
    .joins('LEFT JOIN sellers AS s ON p.seller_id = s.id')
    .order('p.price ASC')
  end

end
# SELECT  p.name, p.category, p.description, p.seller_id, p.id, p.price, s.name AS seller_name
# FROM products AS p
# INNER JOIN sellers AS s ON p.seller_id = s.id
# ORDER BY p.price ASC