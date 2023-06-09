class Api::ListingsController < ApplicationController 

wrap_parameters :listing, include: Listing.attribute_names + [:photos]

    def index
        @listings = Listing.all
        render :index
    end
  
    def show
        @listing = Listing.find(params[:id])
        render :show
    end
  
    def create
        
        @listing = Listing.new(listing_params)

        if @listing.save
            render :show
        else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def search 
        @listings = Listing.where("city ILIKE ? OR state ILIKE ?", "%#{params[:search]}%")
        render :index
    end 

    def edit
        @listing = Listing.find(params[:id])
    end
    
    def update
        @listing = Listing.find(params[:id])
        if @listing.update(listing_params)
            render :show
        else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def destroy
        @listing = Listing.find(params[:id])
        @listingID = @listing.id 
        @listing.destroy
        
        render json: @listingID 
    end

    private 

    def listing_params 
        params.require(:listing).permit(
            :title, :description, :price, :bedrooms, :bathrooms, :address, :city, :state, :zip_code, :square_feet, :poster_id, photos: [])
    end 


end