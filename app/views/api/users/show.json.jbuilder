json.user do
  json.extract! @user, :id, :email, :username, :created_at, :updated_at
end

json.favorites do
    @user.favorites.each do |favorite|
        json.set! favorite.id do
            json.(favorite, :id, :user_id, :listing_id)
        end
    end
end

json.bookings do
    @user.bookings.each do |booking|
        json.set! booking.id do 
            json.(booking, :id, :user_id, :listing_id, :date, :time, :participants)
        end  
    end 
end 