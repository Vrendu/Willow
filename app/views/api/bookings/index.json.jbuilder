@bookings.each do |booking|
    json.set! booking.id do
        json.id booking.id
        json.user_id booking.user_id
        json.listing_id booking.listing_id
        json.date booking.date
        json.time booking.time
        json.participants booking.participants
    end
end 