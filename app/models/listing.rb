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
#
class Listing < ApplicationRecord
    validates :address, :city, :state, :zip_code, :price, 
    :poster_id, :bedrooms, :bathrooms, :title, :description, presence: true

    belongs_to :poster, 
    class_name: :User,
    foreign_key: :poster_id 

end
