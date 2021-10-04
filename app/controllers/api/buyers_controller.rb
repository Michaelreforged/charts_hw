class Api::BuyersController < ApplicationController

  def category
    render json: Buyer.category
  end
end
