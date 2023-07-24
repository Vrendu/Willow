  json.extract! @listing, :id, :address, :city, :state, :zip_code,
    :price, :poster_id, :bedrooms, :bathrooms, :title, :description,
    :square_feet, :created_at, :updated_at
    json.photos @listing.photos.map {|file| url_for(file)}

json.reviews do 
    @listing.reviews.each do |review|
      json.set! review.id do 
          json.(review, :id, :author_id, :listing_id, :title, :description, :rating)
      end  
    end 
end 