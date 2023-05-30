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
    
    validates :participants, numericality: { greater_than_or_equal_to: 1, message: "cannot be less than 1"}

    validate :unique_date_and_time_combination
    validate :date_not_in_past

    def unique_date_and_time_combination
      if Booking.exists?(listing_id: listing_id, date: date, time: time)
        errors.add(:base, "This date and time combination is already booked")
      end
    end

    def date_not_in_past
      if date && date < Date.today
        errors.add(:date, "is already past, please choose another date")
      end
    end
        
    
end
