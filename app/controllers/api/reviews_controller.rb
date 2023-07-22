class ReviewsController < ApplicationController
    def index
        if params[:listing_id].present?
            @reviews = Review.where(listing_id: params[:listing_id])
        else
            @reviews = Review.all
        end
        render :index
    end
    
    def create
        @review = Review.new(review_params)
        
        if @review.save
            render :show 
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def show
        @review = Review.find(params[:id])
        render :show 
    end
    
    def destroy
        @review = Review.find(params[:id])
        @review.destroy
        render json: @review
    end

    def update
        @review = Review.find(params[:id])
        if @review.update(review_params)
            render :show
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private
    
    def review_params
        params.require(:review).permit(:title, :description, :rating, :listing_id, :author_id)
    end
end
