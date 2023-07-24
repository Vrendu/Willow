class Review < ApplicationRecord

    validates :listing_id, :author_id, :rating, :description, presence: true
    validates :rating, inclusion: { in: (1..5), message: "must be selected" }
    
    validates :title, presence: true, length: { minimum: 5, maximum: 50, message: "must be 5 - 50 characters" }
    validates :description, presence: true, length: {minimum: 20, maximum: 500, message: "must be 20 - 500 characters" }

    belongs_to :listing,
    class_name: :Listing,
    foreign_key: :listing_id

    belongs_to :author,
    class_name: :User,
    foreign_key: :author_id
end