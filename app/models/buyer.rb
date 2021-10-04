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
end
