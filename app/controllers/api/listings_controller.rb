class Api::ListingsController < ApplicationController 

wrap_parameters :listing, include: Listing.attribute_names + [:photos]

     def index
        if params[:q].present? && !params[:latitude].present? && !params[:longitude].present?
            search_query = "%#{params[:q]}%"
            @listings = Listing.where(
                "zip_code ILIKE ? OR city ILIKE ? OR state ILIKE ? OR address ILIKE ?",
                search_query, search_query, search_query, search_query
            )
        elsif params[:latitude].present? && params[:longitude].present? && !params[:q].present?
            # Extract latitude and longitude from the user's location data
            user_latitude, user_longitude = params[:latitude], params[:longitude]
            
            # Now you have the user's coordinates, and you can use them for geospatial queries
            user_location = [user_latitude, user_longitude]

            # Listings within a 100-kilometer radius of the user's location
            @listings = Listing.near(user_location, 300)
        end
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