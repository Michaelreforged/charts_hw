class Api::SellersController < ApplicationController

  def category_by_seller
    render json: Seller.category_amt_data
  end

  def avg_price_by_category
    render json: Seller.avg_price_by_category
  end

end
