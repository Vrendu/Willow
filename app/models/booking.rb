# == Schema Information
#
# Table name: bookings
#
#  id           :bigint           not null, primary key
#  listing_id   :integer          not null
#  user_id      :integer          not null
#  date         :date
#  time         :time
#  participants :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Booking < ApplicationRecord

  belongs_to :listing, 
    class_name: :Listing,
    foreign_key: :listing_id

    belongs_to :user,
    class_name: :User,
    foreign_key: :user_id

    validates :listing_id, :user_id, :date, :time, :participants, presence: true

    validates :user_id, uniqueness: { scope: :listing_id, message: "has already booked this listing" }
    
  
        
    
end
