# == Schema Information
#
# Table name: listings
#
#  id          :bigint           not null, primary key
#  address     :string           not null
#  city        :string           not null
#  state       :string           not null
#  zip_code    :string           not null
#  price       :decimal(, )      not null
#  poster_id   :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  bedrooms    :integer          not null
#  bathrooms   :integer          not null
#  title       :string           not null
#  description :text             not null
#  square_feet :integer
#
class Listing < ApplicationRecord
    validates :address, :city, :state, :zip_code, :price, 
    :poster_id, :bedrooms, :bathrooms, :title, :description, presence: true

    belongs_to :poster, 
    class_name: :User,
    foreign_key: :poster_id 

    has_many_attached :photos

    has_many :favorites,
    foreign_key: :listing_id,
    class_name: :Favorite,
    dependent: :destroy  

    has_many :users_who_favorited,
    through: :favorites, 
    source: :user 
    
    has_many :bookings,
    foreign_key: :listing_id,
    class_name: :Booking

end
