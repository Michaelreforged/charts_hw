class Api::BuyersController < ApplicationController

  def category
    render json: Buyer.category
  end

  def category_avg_price
    render json: Buyer.category_avg_price
  end
end
