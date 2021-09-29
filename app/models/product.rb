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

# SELECT DISTINCT p.seller_id, s.name
# FROM products AS p
# INNER JOIN sellers AS s ON p.seller_id = s.id

  def self.sellers
    select('DISTINCT p.seller_id, s.name')
    .from('products AS p')
    .joins('INNER JOIN sellers AS s ON p.seller_id = s.id')
  end
  
# SELECT DISTINCT p.seller_id, s.name AS seller_name, p.name, p.price, p.description, p.category
# FROM products AS p
# INNER JOIN sellers AS s ON p.seller_id = s.id
# WHERE LOWER(s.name) = 'jerry schowalter' 

  def self.by_sellers(seller)
    select('DISTINCT p.seller_id, p.name, p.price, p.description, p.category')
    .from('products AS p')
    .joins('INNER JOIN sellers AS s ON p.seller_id = s.id')
    .where('s.id = ? ', seller)
    .order('p.price ASC')
  end


end
# SELECT  p.name, p.category, p.description, p.seller_id, p.id, p.price, s.name AS seller_name
# FROM products AS p
# INNER JOIN sellers AS s ON p.seller_id = s.id
# ORDER BY p.price ASC