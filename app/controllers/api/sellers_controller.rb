class Api::SellersController < ApplicationController

  def category_by_seller
    render json: Seller.category_amt_data
  end

end
