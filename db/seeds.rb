# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

User.destroy_all   
Listing.destroy_all

ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('listings')
User.create!(
    username: 'Demo', 
    email: 'dummyaccount@gmail.com', 
    password: 'demoaccount'
)

user_ids = User.pluck(:id)

Listing.create!(
  title: "Luxury Condo in Downtown San Francisco",
  description: "Beautifully furnished luxury condo in the heart of San Francisco's Financial District. Features stunning views of the Bay Bridge and downtown skyline, gourmet kitchen, and top-of-the-line amenities.",
  price: 950000,
  bedrooms: 2,
  bathrooms: 2,
  address: "555 California St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94104",
  square_feet: 3200,
  poster_id: user_ids.sample
)


Listing.create!(
  title: "Charming Cottage in the Berkeley Hills",
  description: "Lovely and cozy cottage nestled in the beautiful Berkeley Hills. Features a serene and tranquil atmosphere, breathtaking views of the Bay, and all the amenities you need for a comfortable stay.",
  price: 2200000,
  bedrooms: 1,
  bathrooms: 1,
  address: "100 Grizzly Peak Blvd",
  city: "Berkeley",
  state: "CA",
  zip_code: "94708",
  square_feet: 2300,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Spacious Family Home in Silicon Valley",
  description: "Gorgeous family home in the heart of Silicon Valley. Features a spacious and open floor plan, beautiful outdoor living spaces, and plenty of room for the whole family.",
  price: 1200000,
  bedrooms: 4,
  bathrooms: 3,
  address: "123 Main St",
  city: "Palo Alto",
  state: "CA",
  zip_code: "94301",
  square_feet: 1200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Beautiful house in San Francisco",
  description: "This stunning house is located in the heart of San Francisco, just a few blocks away from the iconic Golden Gate Bridge. With spacious bedrooms, a modern kitchen, and breathtaking views, this is the perfect place for your dream vacation.",
  address: "123 Main St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94123",
  price: 3000000,
  bedrooms: 3,
  bathrooms: 2,
  square_feet: 2500,
  poster_id: User.first.id
  
)

Listing.create!(
  title: "Stylish Apartment in the Heart of San Francisco",
  description: "This modern apartment is located in the heart of San Francisco, just a few steps away from the city's best restaurants, bars, and shops. With sleek design, comfortable furnishings, and all the amenities you need, this is the perfect place for your next trip to the Bay Area.",
  address: "456 Pine St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94108",
  price: 900000,
  bedrooms: 2,
  bathrooms: 1,
  square_feet: 1200,
  poster_id: User.first.id
  
)

Listing.create!(
  title: "Luxurious Home with Breathtaking Views",
  description: "This luxurious home is perched on a hill overlooking San Francisco Bay, with stunning views of the water and the city skyline. With five spacious bedrooms, a chef's kitchen, and multiple outdoor spaces, this is the perfect place for your family vacation or corporate retreat.",
  address: "789 Broadway",
  city: "San Francisco",
  state: "CA",
  zip_code: "94109",
  price: 3000000,
  bedrooms: 5,
  bathrooms: 3,
  square_feet: 5000,
  poster_id: User.first.id
  
)

Listing.create!(
  title: "Modern Condo in the Heart of San Jose",
  description: "Brand new, modern condo located in downtown San Jose. Walking distance to all the best restaurants, shops, and entertainment. Features high-end finishes, in-unit laundry, and a private balcony.",
  price: 750000,
  bedrooms: 1,
  bathrooms: 1,
  address: "345 S 5th St",
  city: "San Jose",
  state: "CA",
  zip_code: "95112",
  square_feet: 2100,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Luxury Penthouse in Pacific Heights",
  description: "Stunning penthouse unit in one of San Francisco's most exclusive neighborhoods. Features breathtaking views of the Golden Gate Bridge, spacious living areas, and a private rooftop deck.",
  price: 1850000,
  bedrooms: 3,
  bathrooms: 3,
  address: "2000 Washington St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94109",
  square_feet: 1400,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Cozy Cottage in the Redwoods",
  description: "Escape to this charming and rustic cottage nestled in the beautiful redwoods. Features a cozy fireplace, peaceful surroundings, and a private hot tub.",
  price: 400000,
  bedrooms: 2,
  bathrooms: 1,
  address: "1234 Redwood Dr",
  city: "Mill Valley",
  state: "CA",
  zip_code: "94941",
  square_feet: 1350,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Sunny Studio in the Mission District",
  description: "Bright and sunny studio apartment located in the heart of San Francisco's vibrant Mission District. Features a fully equipped kitchen, in-unit laundry, and easy access to public transportation.",
  price: 1000000,
  bedrooms: 0,
  bathrooms: 1,
  address: "123 Mission St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94103",
  square_feet: 1500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Secluded Retreat in Sonoma County",
  description: "Get away from it all at this secluded and peaceful retreat in Sonoma County. Features beautiful gardens, a private hot tub, and easy access to wineries and hiking trails.",
  price: 400000,
  bedrooms: 2,
  bathrooms: 2,
  address: "5678 Wine Country Rd",
  city: "Glen Ellen",
  state: "CA",
  zip_code: "95442",
  square_feet: 1500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Stunning Oceanfront Villa in Malibu",
  description: "Experience the ultimate in luxury living in this breathtaking oceanfront villa in Malibu. Features a private pool, outdoor living areas, and stunning views of the Pacific Ocean.",
  price: 1500000,
  bedrooms: 5,
  bathrooms: 5,
  address: "123 Malibu Road",
  city: "Malibu",
  state: "CA",
  zip_code: "90265",
  square_feet: 2000,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Modern Loft in Trendy Downtown LA",
  description: "Chic and modern loft in the heart of downtown LA. Features sleek and stylish furnishings, large windows with panoramic views, and all the amenities you need for a comfortable stay.",
  price: 350000,
  bedrooms: 1,
  bathrooms: 1,
  address: "123 S Figueroa St",
  city: "Los Angeles",
  state: "CA",
  zip_code: "90012",
  square_feet: 900,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Luxury Retreat in Napa Valley",
  description: "Escape to this luxurious and serene retreat in the heart of Napa Valley. Features stunning views of the vineyards, a private pool, and all the amenities you need for a relaxing stay.",
  price: 800000,
  bedrooms: 3,
  bathrooms: 3,
  address: "1234 Vineyard Lane",
  city: "Napa",
  state: "CA",
  zip_code: "94558",
  square_feet: 5000,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Secluded Mountain Cabin in Lake Tahoe",
  description: "Experience the beauty of Lake Tahoe in this cozy and secluded mountain cabin. Features a rustic yet modern interior, beautiful views of the surrounding forest, and all the amenities you need for a comfortable stay.",
  price: 2500000,
  bedrooms: 2,
  bathrooms: 1,
  address: "123 Pine Street",
  city: "Tahoe City",
  state: "CA",
  zip_code: "96145",
  square_feet: 1500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Historic Victorian in Pacific Heights",
  description: "Step back in time and experience the elegance and charm of this beautifully restored Victorian home in Pacific Heights. Features ornate details, antique furnishings, and all the modern amenities you need for a comfortable stay.",
  price: 2000000,
  bedrooms: 3,
  bathrooms: 2,
  address: "1234 Broadway St",
  city: "San Francisco",
  state: "CA",
  zip_code: "94109",
  square_feet: 1500,
  poster_id: user_ids.sample
)


Listing.all.each_with_index do |listing, index| 
    listing.photos.attach(
        io: URI.open("https://willow-v-seeds.s3.us-west-1.amazonaws.com/House+Photos+for+FullStack+Project/file#{index+1}.webp"),
        filename: "file#{index + 1}.webp"
    )
end