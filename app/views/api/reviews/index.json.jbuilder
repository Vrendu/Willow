@reviews.each do |review|
    json.set! review.id do 
        json.id review.id
        json.author_id review.author_id
        json.listing_id review.listing_id
        json.title review.title 
        json.description review.description
        json.rating review.rating 
    end 
end 