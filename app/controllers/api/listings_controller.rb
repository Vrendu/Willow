class Api::ListingsController < ApplicationController 

    def index
        @listings = Listing.all
        render 'index.json.jbuilder'
    end
  
    def show
        @listing = Listing.find(params[:id])
        render 'show.json.jbuilder'
    end
  
    def create
        @listing = Listing.new(listing_params)
        if @listing.save
            render 'show.json.jbuilder'
        else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def edit
        @listing = Listing.find(params[:id])
    end
    
    def update
        @listing = Listing.find(params[:id])
        if @listing.update(listing_params)
            render 'show.json.jbuilder'
        else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def destroy
        @listing = Listing.find(params[:id])
        @listing.destroy
        render json: { message: 'Listing successfully deleted' }
    end

    private 

    def listing_params 
        params.require(:listing).permit(
            :address, :city, :state, :zip_code, :price, :bedrooms,
            :bathrooms, :title, :description, :square_feet)
    end 


end