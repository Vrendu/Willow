@favorites.each do |favorite|
    json.set! favorite.id do 
        id: favorite.id,
        user_id: favorite.user_id,
        listing_id: favorite.listing_id
    end 
end