class Review < ApplicationRecord

    validates :listing_id, :author_id, :rating, :description, presence: true
    validates :rating, inclusion: { in: (1..5) }
    # add validation for description length
    validates :title, presence: true, length: { maximum: 50 }
    validates :description, presence: true, length: { maximum: 500 }

    belongs_to :listing,
    class_name: :Listing,
    foreign_key: :listing_id

    belongs_to :author,
    class_name: :User,
    foreign_key: :author_id
end