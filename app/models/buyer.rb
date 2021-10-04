class Buyer < ApplicationRecord
  belongs_to :seller

    # SELECT b.desired_category, s.id, count(b.desired_category) as desired_category_count
  # FROM sellers as s
  # LEFT JOIN buyers as b
  # ON b.seller_id = s.id
  # GROUP BY desired_category, s.id
  # ORDER BY s.id
  def self.category
    select("b.desired_category, s.id, count(b.desired_category) as desired_category_count, s.name")
    .from("buyers as b")
    .joins("LEFT JOIN sellers as s ON b.seller_id = s.id ")
    .group("desired_category, s.id")
    .order("desired_category")
  end
  # SELECT AVG(b.max_price) as avg_Max, desired_category, count(desired_category)
  # FROM buyers as b
  # LEFT JOIN sellers as s
  # ON b.seller_id = s.id
  # GROUP BY desired_category
  # ORDER BY desired_category
  def self.category_avg_price
    select("AVG(b.max_price) as avg_Max, b.desired_category, count(b.desired_category)")
    .from("buyers as b")
    .joins("LEFT JOIN sellers as s ON s.id = b.seller_id ")
    .group("b.desired_category")
    .order("b.desired_category")
  end
end
