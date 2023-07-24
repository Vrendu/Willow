# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  session_token   :string
#  username        :string
#
class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: true, length: { in: 3..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email,  uniqueness: true, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..50 }, allow_nil: true

    before_validation :ensure_session_token

    has_many :listings,
    class_name: :Listing,
    foreign_key: :poster_id

    has_many :favorites, 
    foreign_key: :user_id,
    class_name: :Favorite

    has_many :favorited_listings,
    through: :favorites,
    source: :listing 

    has_many :bookings,
    class_name: :Booking,
    foreign_key: :user_id,
    dependent: :destroy

    has_many :reviews,
    class_name: :Review,
    foreign_key: :author_id,
    dependent: :destroy

    def self.find_by_credentials(credential, password)
        field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
        user = User.find_by(field => credential)
        user&.authenticate(password)
    end

    def reset_session_token!
        self.update!(session_token: generate_unique_session_token)
        self.session_token
    end

    private

    def generate_unique_session_token
        loop do
            token = SecureRandom.base64
            break token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end
