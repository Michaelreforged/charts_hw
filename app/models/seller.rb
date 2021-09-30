class Seller < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :buyers, dependent: :destroy

#   SELECT count(s.id), category, s.id as sellers_id, s.name
#   FROM sellers as s
#   LEFT JOIN products as p ON p.seller_id = s.id
#   GROUP By category, s.id
#   ORDER BY category asc

  def self.category_amt_data
    select('count(s.id), category, s.id as sellers_id, s.name')
    .from('sellers as s')
    .joins('LEFT JOIN products as p ON p.seller_id = s.id')
    .group('category, s.id')
    .order('category asc')
  end

end
