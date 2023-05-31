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
  VALID_STATE_ABBREVIATIONS = %w[AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY].freeze

  validates :address, :city, :zip_code, :price, :poster_id, :bedrooms, :bathrooms, :title, :description, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 50000, message: "must be at least 50,000" }
  validates :bedrooms, :bathrooms, numericality: { greater_than_or_equal_to: 1, message: "must be at least 1" }
  validates :address, format: { with: /\A[\w\s]+\z/, message: "should only contain letters, numbers, and spaces" }
  validates :city, format: { with: /\A[a-zA-Z\s]+\z/, message: "should only contain letters and spaces" }
  validates :zip_code, format: { with: /\A\d{5}\z/, message: "should be a 5-digit number" }
  validates :state, inclusion: { in: VALID_STATE_ABBREVIATIONS, message: "should be a valid state abbreviation" }

  belongs_to :poster, class_name: :User, foreign_key: :poster_id
  has_many_attached :photos
  has_many :favorites, foreign_key: :listing_id, class_name: :Favorite, dependent: :destroy
  has_many :users_who_favorited, through: :favorites, source: :user
  has_many :bookings, foreign_key: :listing_id, class_name: :Booking
end
