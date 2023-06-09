# == Schema Information
#
# Table name: favorites
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Favorite < ApplicationRecord
    
    validates :user_id, uniqueness: { scope: :listing_id }
    
    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User 

    belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing
    
    


end
