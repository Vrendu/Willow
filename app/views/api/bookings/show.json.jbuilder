json.booking do 
    json.extract! @booking, :id, :user_id, :listing_id, :date, :time, :participants 
end 