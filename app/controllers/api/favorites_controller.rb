class Api::FavoritesController < ApplicationController
  def create
    @favorite = Favorite.new(favorite_params)
    if @favorite.save
      render :show
    else
      render json: { errors: @favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @favorite.destroy
    render json: params[:id]
  end

  private

  def favorite_params
    params.require(:favorite).permit(:user_id, :listing_id)
  end
end