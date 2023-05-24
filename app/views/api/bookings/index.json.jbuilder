@bookings.each do |booking|
    json.set! booking.id do 
        id: booking.id,
        user_id: booking.user_id,
        listing_id: booking.listing_id,
        date: booking.date,
        time: booking.time,
        participants: booking.participants  
    end 
end 