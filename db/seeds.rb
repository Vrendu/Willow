# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'
Review.destroy_all
Favorite.destroy_all 
Listing.destroy_all
User.destroy_all 

ApplicationRecord.connection.reset_pk_sequence!('favorites')
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('listings')

User.create!(
    username: 'Demo', 
    email: 'dummyaccount@gmail.com', 
    password: 'demoaccount'
)

User.create!(
    username: 'Tommy Shelby', 
    email: 'tommy_shelby@gmail.com', 
    password: 'peakyblinders'
)

User.create!(
    username: 'Vamshi Renduchintala', 
    email: 'vamshi101@gmail.com', 
    password: 'vamshi101'
)

User.create!(
    username: 'Bill Clinton', 
    email: 'bill_clinton@gmail.com', 
    password: 'president'
)

User.create!(
    username: 'Tony Soprano', 
    email: 'tony_soprano@gmail.com', 
    password: 'thisthingofours'
)

User.create!(
    username: 'Adriana Moltisanti', 
    email: 'adriana_moltisanti@gmail.com', 
    password: 'cristufuhhh'
)

User.create!(
    username: 'Michael Corleone',
    email: 'the_godfather@gmail.com',
    password: 'thegodfather'
)

User.create!(
    username: 'Don Vito Corleone',
    email: 'the_don@gmail.com',
    password: 'thegodfather'
)

User.create!(
    username: 'Sonny Corleone',
    email: 'the_brother@gmail.com',
    password: 'thegodfather'
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
  poster_id: user_ids.sample
  
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
  poster_id: user_ids.sample
  
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
  poster_id: user_ids.sample
  
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
  bedrooms: 1,
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

# Seattle Listings

Listing.create!(
  title: "Modern Condo in Downtown Seattle",
  description: "Brand new, modern condo located in downtown Seattle. Walking distance to all the best restaurants, shops, and entertainment. Features high-end finishes, in-unit laundry, and a private balcony.",
  price: 750000,
  bedrooms: 1,
  bathrooms: 1,
  address: "345 S 5th St",
  city: "Seattle",
  state: "WA",
  zip_code: "98101",
  square_feet: 2100,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Luxury Penthouse in Belltown",
  description: "Stunning penthouse unit in one of Seattle's most exclusive neighborhoods. Features breathtaking views of the Space Needle, spacious living areas, and a private rooftop deck.",
  price: 1850000,
  bedrooms: 3,
  bathrooms: 3,
  address: "2000 1st Ave",
  city: "Seattle",
  state: "WA",
  zip_code: "98121",
  square_feet: 1400,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Cozy Cottage in the Cascade Mountains",
  description: "Escape to this charming and rustic cottage nestled in the beautiful Cascade Mountains. Features a cozy fireplace, peaceful surroundings, and a private hot tub.",
  price: 400000,
  bedrooms: 2,
  bathrooms: 1,
  address: "1234 Redwood Dr",
  city: "Snoqualmie Pass",
  state: "WA",
  zip_code: "98068",
  square_feet: 1350,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Sunny Studio in Capitol Hill",
  description: "Bright and sunny studio apartment located in the heart of Seattle's vibrant Capitol Hill neighborhood. Features a fully equipped kitchen, in-unit laundry, and easy access to public transportation.",
  price: 1000000,
  bedrooms: 1,
  bathrooms: 1,
  address: "3316 Lauren Drive",
  city: "Seattle",
  state: "WA",
  zip_code: "98102",
  square_feet: 1500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Secluded Retreat in the San Juan Islands",
  description: "Get away from it all at this secluded and peaceful retreat in the San Juan Islands. Features beautiful gardens, a private hot tub, and easy access to hiking trails.",
  price: 400000,
  bedrooms: 2,
  bathrooms: 2,
  address: "5678 Wine Country Rd",
  city: "Friday Harbor",
  state: "WA",
  zip_code: "98250",
  square_feet: 1500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Downtown Seattle Condo with Water View",
  description: "Elegant condo in the heart of downtown Seattle, offering stunning views of Puget Sound. Enjoy the convenience of city living with all the modern amenities.",
  price: 800000,
  bedrooms: 2,
  bathrooms: 2,
  address: "123 Pine Street",
  city: "Seattle",
  state: "WA",
  zip_code: "98101",
  square_feet: 1300,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Charming Craftsman Home in Tacoma",
  description: "A charming Craftsman-style home in Tacoma's historic district. This well-maintained property offers a spacious yard, original details, and easy access to Tacoma's vibrant scene.",
  price: 475000,
  bedrooms: 3,
  bathrooms: 2,
  address: "456 Oakwood Avenue",
  city: "Tacoma",
  state: "WA",
  zip_code: "98403",
  square_feet: 1800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Modern Loft in Bellevue",
  description: "Contemporary loft living in Bellevue's tech hub. This stylish loft features open spaces, high ceilings, and is surrounded by shopping and dining options.",
  price: 650000,
  bedrooms: 1,
  bathrooms: 1,
  address: "789 Tech Park Boulevard",
  city: "Bellevue",
  state: "WA",
  zip_code: "98004",
  square_feet: 1000,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Secluded Cabin in Leavenworth",
  description: "Escape to a secluded cabin in the picturesque town of Leavenworth. Enjoy the beauty of the Cascade Mountains, hiking trails, and a cozy retreat in the woods.",
  price: 350000,
  bedrooms: 2,
  bathrooms: 1,
  address: "567 Forest Retreat Road",
  city: "Leavenworth",
  state: "WA",
  zip_code: "98826",
  square_feet: 1200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Lakefront Home in Bellingham",
  description: "A stunning lakefront home in Bellingham with panoramic views of Lake Whatcom. Features a private dock, spacious deck, and a perfect setting for water enthusiasts.",
  price: 950000,
  bedrooms: 4,
  bathrooms: 3,
  address: "123 Lakeside Drive",
  city: "Bellingham",
  state: "WA",
  zip_code: "98229",
  square_feet: 2800,
  poster_id: user_ids.sample
)



# Boston and Massachusetts Listings

Listing.create!(
  title: "Cozy Cottage in Historic Salem",
  description: "A charming cottage nestled in the historic town of Salem. This cozy retreat offers a tranquil garden, perfect for relaxation. Enjoy the rich history and culture of Salem just steps away.",
  price: 275000,
  bedrooms: 2,
  bathrooms: 1,
  address: "123 Witchcraft Lane",
  city: "Salem",
  state: "MA",
  zip_code: "01970",
  square_feet: 1100,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Spacious Family Home in Newton",
  description: "A spacious family home in the desirable city of Newton. Featuring a large backyard, open floor plan, and excellent school districts, this home is perfect for families.",
  price: 750000,
  bedrooms: 4,
  bathrooms: 2,
  address: "456 Oaktree Lane",
  city: "Newton",
  state: "MA",
  zip_code: "02458",
  square_feet: 2400,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Luxury Condo in Back Bay, Boston",
  description: "Luxurious condo in the prestigious Back Bay neighborhood of Boston. Enjoy high-end finishes, concierge service, and proximity to world-class shopping and dining.",
  price: 980000,
  bedrooms: 2,
  bathrooms: 2,
  address: "789 Commonwealth Ave",
  city: "Boston",
  state: "MA",
  zip_code: "02215",
  square_feet: 1500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Lakefront Retreat in Worcester",
  description: "A serene lakefront retreat in Worcester, perfect for nature lovers. This home offers stunning water views, a private dock, and easy access to hiking trails.",
  price: 425000,
  bedrooms: 3,
  bathrooms: 2,
  address: "567 Lakeside Drive",
  city: "Worcester",
  state: "MA",
  zip_code: "01609",
  square_feet: 1800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Historic Brownstone in Beacon Hill, Boston",
  description: "Live in the heart of historic Beacon Hill in this charming brownstone. Original architectural details, a private courtyard, and proximity to Charles River make it a rare find.",
  price: 625000,
  bedrooms: 2,
  bathrooms: 1,
  address: "112 Acorn Street",
  city: "Boston",
  state: "MA",
  zip_code: "02108",
  square_feet: 1400,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Country Estate in Concord",
  description: "Escape to this country estate in Concord, surrounded by nature. This elegant home offers a spacious garden, a pond, and easy access to historic Concord attractions.",
  price: 875000,
  bedrooms: 5,
  bathrooms: 3,
  address: "789 Meadowbrook Road",
  city: "Concord",
  state: "MA",
  zip_code: "01742",
  square_feet: 3200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Contemporary Loft in Cambridge",
  description: "A contemporary loft in vibrant Cambridge. This urban space features high ceilings, exposed brick, and is close to universities, tech companies, and cultural hotspots.",
  price: 550000,
  bedrooms: 1,
  bathrooms: 1,
  address: "234 Tech Park Avenue",
  city: "Cambridge",
  state: "MA",
  zip_code: "02139",
  square_feet: 1000,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Seaside Cottage in Cape Cod",
  description: "Experience seaside living in this charming Cape Cod cottage. Enjoy breathtaking ocean views, a private beach, and the tranquility of Cape Cod living.",
  price: 425000,
  bedrooms: 2,
  bathrooms: 1,
  address: "456 Beachfront Drive",
  city: "Cape Cod",
  state: "MA",
  zip_code: "02601",
  square_feet: 1200,
  poster_id: user_ids.sample
)



# New York Listings
Listing.create!(
  title: "Luxury Penthouse in Manhattan",
  description: "Elevate your lifestyle with this luxurious penthouse in the heart of Manhattan. Enjoy breathtaking skyline views, top-of-the-line amenities, and upscale living.",
  price: 5000000,
  bedrooms: 4,
  bathrooms: 4,
  address: "123 Park Avenue",
  city: "New York",
  state: "NY",
  zip_code: "10017",
  square_feet: 3500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Brownstone Beauty in Brooklyn Heights",
  description: "Live in a historic brownstone in the charming neighborhood of Brooklyn Heights. This elegant home offers classic architectural details and a private garden.",
  price: 2750000,
  bedrooms: 5,
  bathrooms: 3,
  address: "456 Willow Street",
  city: "Brooklyn",
  state: "NY",
  zip_code: "11201",
  square_feet: 2800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Modern Condo in Long Island City",
  description: "Contemporary condo living in Long Island City. Features open layouts, city views, and easy access to Manhattan via public transit.",
  price: 900000,
  bedrooms: 2,
  bathrooms: 2,
  address: "789 Queens Plaza",
  city: "Long Island City",
  state: "NY",
  zip_code: "11101",
  square_feet: 1200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Historic Townhouse in Harlem",
  description: "Own a piece of history with this beautifully restored townhouse in Harlem. Enjoy original details, a private backyard, and proximity to cultural landmarks.",
  price: 1600000,
  bedrooms: 6,
  bathrooms: 4,
  address: "101 Malcolm X Boulevard",
  city: "New York",
  state: "NY",
  zip_code: "10026",
  square_feet: 3200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Waterfront Apartment in Battery Park City",
  description: "Live by the water in Battery Park City. This waterfront apartment offers stunning Hudson River views, modern finishes, and serene living in the city.",
  price: 2200000,
  bedrooms: 3,
  bathrooms: 2,
  address: "567 Battery Place",
  city: "New York",
  state: "NY",
  zip_code: "10280",
  square_feet: 1800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Chic Loft in SoHo",
  description: "Experience loft living in the trendy neighborhood of SoHo. This chic space features high ceilings, exposed brick, and is surrounded by art galleries and boutiques.",
  price: 1500000,
  bedrooms: 2,
  bathrooms: 2,
  address: "234 Mercer Street",
  city: "New York",
  state: "NY",
  zip_code: "10012",
  square_feet: 1600,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Spacious Family Home in Queens",
  description: "A spacious family home in a quiet Queens neighborhood. This property offers a large backyard, modern upgrades, and excellent schools nearby.",
  price: 800000,
  bedrooms: 4,
  bathrooms: 3,
  address: "345 Maple Avenue",
  city: "Queens",
  state: "NY",
  zip_code: "11423",
  square_feet: 2200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Garden Retreat in Staten Island",
  description: "Escape to a garden retreat in Staten Island. This serene property offers lush landscaping, a deck for outdoor entertaining, and a peaceful escape from city life.",
  price: 750000,
  bedrooms: 3,
  bathrooms: 2,
  address: "678 Oakwood Lane",
  city: "Staten Island",
  state: "NY",
  zip_code: "10301",
  square_feet: 1900,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Lakefront Home in the Catskills",
  description: "A beautiful lakefront home in the scenic Catskill Mountains. Enjoy waterfront living, boating, and relaxation in this tranquil escape from the city.",
  price: 1200000,
  bedrooms: 4,
  bathrooms: 3,
  address: "101 Mountain View Road",
  city: "Catskill",
  state: "NY",
  zip_code: "12414",
  square_feet: 2800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Cozy Apartment in Astoria",
  description: "A cozy apartment in the diverse neighborhood of Astoria. This well-maintained unit offers affordability and easy access to dining, shops, and transportation.",
  price: 500000,
  bedrooms: 1,
  bathrooms: 1,
  address: "345 Main Street",
  city: "Astoria",
  state: "NY",
  zip_code: "11102",
  square_feet: 800,
  poster_id: user_ids.sample
)

#Chicago Listings

Listing.create!(
  title: "Luxury Condo in Downtown Chicago",
  description: "Experience luxury living in downtown Chicago. This elegant condo offers stunning city views, modern finishes, and access to the vibrant Chicago scene.",
  price: 1200000,
  bedrooms: 3,
  bathrooms: 2,
  address: "123 Magnificent Mile",
  city: "Chicago",
  state: "IL",
  zip_code: "60611",
  square_feet: 1800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Suburban Oasis in Naperville",
  description: "Escape to this suburban oasis in Naperville. Enjoy a spacious backyard, a quiet neighborhood, and top-rated schools in this family-friendly home.",
  price: 550000,
  bedrooms: 4,
  bathrooms: 3,
  address: "456 Oakwood Lane",
  city: "Naperville",
  state: "IL",
  zip_code: "60540",
  square_feet: 2400,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Modern Loft in West Loop, Chicago",
  description: "Contemporary loft living in Chicago's West Loop. This stylish loft features open spaces, industrial touches, and proximity to dining and nightlife.",
  price: 800000,
  bedrooms: 2,
  bathrooms: 2,
  address: "789 Warehouse Avenue",
  city: "Chicago",
  state: "IL",
  zip_code: "60607",
  square_feet: 1400,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Historic Home in Oak Park",
  description: "Own a piece of history with this beautifully restored home in Oak Park. Enjoy original architectural details, a large porch, and proximity to Frank Lloyd Wright's designs.",
  price: 950000,
  bedrooms: 5,
  bathrooms: 3,
  address: "101 Hemingway Avenue",
  city: "Oak Park",
  state: "IL",
  zip_code: "60302",
  square_feet: 3200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Lakefront Retreat in Lake Geneva, WI",
  description: "A stunning lakefront retreat in Lake Geneva, Wisconsin, just a short drive from Chicago. Enjoy waterfront living, boating, and relaxation in this scenic escape.",
  price: 1500000,
  bedrooms: 4,
  bathrooms: 4,
  address: "567 Lakeside Drive",
  city: "Lake Geneva",
  state: "WI",
  zip_code: "53147",
  square_feet: 2800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Downtown Apartment in Evanston",
  description: "Live in downtown Evanston, just north of Chicago. This modern apartment offers urban living, excellent schools, and easy access to public transportation.",
  price: 700000,
  bedrooms: 2,
  bathrooms: 2,
  address: "234 Elm Street",
  city: "Evanston",
  state: "IL",
  zip_code: "60201",
  square_feet: 1200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Charming Bungalow in Oak Lawn",
  description: "A charming bungalow in the suburban town of Oak Lawn. This cozy home features a landscaped yard, a sunroom, and a quiet neighborhood.",
  price: 350000,
  bedrooms: 3,
  bathrooms: 2,
  address: "345 Maple Avenue",
  city: "Oak Lawn",
  state: "IL",
  zip_code: "60453",
  square_feet: 1500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Riverfront Condo in Aurora",
  description: "Enjoy riverfront living in Aurora, a suburb of Chicago. This condo offers serene water views, a fitness center, and easy access to shopping and dining.",
  price: 450000,
  bedrooms: 2,
  bathrooms: 2,
  address: "678 Riverfront Drive",
  city: "Aurora",
  state: "IL",
  zip_code: "60504",
  square_feet: 1100,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Golf Course Home in Glenview",
  description: "Live on a golf course in the suburban town of Glenview. This spacious home offers scenic views, a large backyard, and proximity to recreational amenities.",
  price: 850000,
  bedrooms: 4,
  bathrooms: 3,
  address: "101 Fairway Lane",
  city: "Glenview",
  state: "IL",
  zip_code: "60025",
  square_feet: 2600,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Rustic Cabin in Starved Rock State Park",
  description: "Escape to a rustic cabin in the beautiful Starved Rock State Park, a short drive from Chicago. Enjoy hiking, nature, and a cozy retreat in the woods.",
  price: 250000,
  bedrooms: 2,
  bathrooms: 1,
  address: "345 Forest Retreat Road",
  city: "Oglesby",
  state: "IL",
  zip_code: "61348",
  square_feet: 1000,
  poster_id: user_ids.sample
)

# Denver Listings 

Listing.create!(
  title: "Luxury Condo in Downtown Denver",
  description: "Experience luxury living in downtown Denver. This elegant condo offers stunning city views, modern finishes, and access to the vibrant Denver scene.",
  price: 1200000,
  bedrooms: 3,
  bathrooms: 2,
  address: "123 Magnificent Mile",
  city: "Denver",
  state: "CO",
  zip_code: "80202",
  square_feet: 1800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Suburban Oasis in Littleton",
  description: "Escape to this suburban oasis in Littleton. Enjoy a spacious backyard, a quiet neighborhood, and top-rated schools in this family-friendly home.",
  price: 550000,
  bedrooms: 4,
  bathrooms: 3,
  address: "456 Oakwood Lane",
  city: "Littleton",
  state: "CO",
  zip_code: "80120",
  square_feet: 2400,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Modern Loft in RiNo, Denver",
  description: "Contemporary loft living in Denver's RiNo neighborhood. This stylish loft features open spaces, industrial touches, and proximity to dining and nightlife.",
  price: 800000,
  bedrooms: 2,
  bathrooms: 2,
  address: "789 Warehouse Avenue",
  city: "Denver",
  state: "CO",
  zip_code: "80205",
  square_feet: 1400,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Historic Home in Boulder",
  description: "Own a piece of history with this beautifully restored home in Boulder. Enjoy original architectural details, a large porch, and proximity to Pearl Street.",
  price: 950000,
  bedrooms: 5,
  bathrooms: 3,
  address: "101 Hemingway Avenue",
  city: "Boulder",
  state: "CO",
  zip_code: "80302",
  square_feet: 3200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Mountain Retreat in Breckenridge",
  description: "A stunning mountain retreat in Breckenridge, Colorado. Enjoy mountain living, skiing, and relaxation in this scenic escape.",
  price: 1500000,
  bedrooms: 4,
  bathrooms: 4,
  address: "567 Lakeside Drive",
  city: "Breckenridge",
  state: "CO",
  zip_code: "80424",
  square_feet: 2800,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Downtown Apartment in Denver",
  description: "Live in downtown Denver. This modern apartment offers urban living, excellent schools, and easy access to public transportation.",
  price: 700000,
  bedrooms: 2,
  bathrooms: 2,
  address: "234 Elm Street",
  city: "Denver",
  state: "CO",
  zip_code: "80206",
  square_feet: 1200,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Charming Bungalow in Englewood",
  description: "A charming bungalow in the suburban town of Englewood. This cozy home features a landscaped yard, a sunroom, and a quiet neighborhood.",
  price: 350000,
  bedrooms: 3,
  bathrooms: 2,
  address: "345 Maple Avenue",
  city: "Englewood",
  state: "CO",
  zip_code: "80110",
  square_feet: 1500,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Riverfront Condo in Denver",
  description: "Enjoy riverfront living in Denver. This condo offers serene water views, a fitness center, and easy access to shopping and dining.",
  price: 450000,
  bedrooms: 2,
  bathrooms: 2,
  address: "678 Riverfront Drive",
  city: "Denver",
  state: "CO",
  zip_code: "80202",
  square_feet: 1100,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Golf Course Home in Castle Rock",
  description: "Live on a golf course in the suburban town of Castle Rock. This spacious home offers scenic views, a large backyard, and proximity to recreational amenities.",
  price: 850000,
  bedrooms: 4,
  bathrooms: 3,
  address: "101 Fairway Lane",
  city: "Castle Rock",
  state: "CO",
  zip_code: "80104",
  square_feet: 2600,
  poster_id: user_ids.sample
)

Listing.create!(
  title: "Rustic Cabin in Estes Park",
  description: "Escape to a rustic cabin in the beautiful Estes Park, Colorado. Enjoy hiking, nature, and a cozy retreat in the woods.",
  price: 250000,
  bedrooms: 2,
  bathrooms: 1,
  address: "345 Forest Retreat Road",
  city: "Estes Park",
  state: "CO",
  zip_code: "80517",
  square_feet: 1000,
  poster_id: user_ids.sample
)




Listing.all.each_with_index do |listing, index| 
    random_index = rand(1..16)
    listing.photos.attach(
        io: URI.open("https://willow-v-seeds.s3.us-west-1.amazonaws.com/House+Photos+for+FullStack+Project/file#{random_index}.webp"),
        filename: "file#{index + 1}.webp"
    )
    (1..4).each do |idx|
        listing.photos.attach(
            io: URI.open("https://willow-v-seeds.s3.us-west-1.amazonaws.com/House+Photos+for+FullStack+Project/file#{random_index}-img#{idx}.webp"),
            filename: "file#{index + 1}-img#{idx}.webp"
        )
    end
end

Review.create!(
  title: "Beautiful home with stunning views",
  description: "This home was absolutely stunning! The views were breathtaking and the house itself was gorgeous. We had a wonderful time and would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Great location, beautiful home",
  description: "We had a great time staying at this home. The location was perfect and the house itself was beautiful. We would definitely stay here again!",
  rating: 4,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Amazing house with everything you need",
  description: "This house was amazing! It had everything we needed and more. The views were breathtaking and the location was perfect. We would definitely stay here again!",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Not as advertised",
  description: "This house was not as advertised. The pictures made it look much nicer than it actually was. The location was also not great, as it was far from everything. We would not stay here again.",
  rating: 2,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Stunning views, great location",
  description: "This house was amazing! The views were breathtaking and the location was perfect. We had a great time and would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Meh Not Super Great",
  description: "This house was just okay. The location was not great and the house itself was not very nice. We would not stay here again.",
  rating: 3,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Pretty good",
  description: "This house was pretty good. The location was great and the house itself was nice. We would stay here again.",
  rating: 4,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Beautiful home with stunning views",
  description: "This home was absolutely stunning! The views were breathtaking and the house itself was gorgeous. We had a wonderful time and would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Great location, beautiful home",
  description: "We had a great time staying at this home. The location was perfect and the house itself was beautiful. We would definitely stay here again!",
  rating: 4,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Amazing house with everything you need",
  description: "This house was amazing! It had everything we needed and more. The views were breathtaking and the location was perfect. We would definitely stay here again!",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Not as advertised",
  description: "This house was not as advertised. The pictures made it look much nicer than it actually was. The location was also not great, as it was far from everything. We would not stay here again.",
  rating: 2,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Stunning views, great location",
  description: "This house was amazing! The views were breathtaking and the location was perfect. We had a great time and would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Need more time to explore",
  description: "We only stayed here for one night, but we wish we could have stayed longer! The house was beautiful and the location was perfect. We would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Great location, beautiful home",
  description: "We had a great time staying at this home. The location was perfect and the house itself was beautiful. We would definitely stay here again!",
  rating: 4,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Amazing house with everything you need",
  description: "This house was amazing! It had everything we needed and more. The views were breathtaking and the location was perfect. We would definitely stay here again!",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Not as advertised",
  description: "This house was not as advertised. The pictures made it look much nicer than it actually was. The location was also not great, as it was far from everything. We would not stay here again.",
  rating: 2,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Stunning views, great location",
  description: "This house was amazing! The views were breathtaking and the location was perfect. We had a great time and would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Need more time to explore",
  description: "We only stayed here for one night, but we wish we could have stayed longer! The house was beautiful and the location was perfect. We would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Great location, beautiful home",
  description: "We had a great time staying at this home. The location was perfect and the house itself was beautiful. We would definitely stay here again!",
  rating: 4,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Amazing house with everything you need",
  description: "This house was amazing! It had everything we needed and more. The views were breathtaking and the location was perfect. We would definitely stay here again!",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Not as advertised",
  description: "This house was not as advertised. The pictures made it look much nicer than it actually was. The location was also not great, as it was far from everything. We would not stay here again.",
  rating: 2,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Stunning views, great location",
  description: "This house was amazing! The views were breathtaking and the location was perfect. We had a great time and would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Need more time to explore",
  description: "We only stayed here for one night, but we wish we could have stayed longer! The house was beautiful and the location was perfect. We would definitely stay here again.",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Great location, beautiful home",
  description: "We had a great time staying at this home. The location was perfect and the house itself was beautiful. We would definitely stay here again!",
  rating: 4,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Amazing house with everything you need",
  description: "This house was amazing! It had everything we needed and more. The views were breathtaking and the location was perfect. We would definitely stay here again!",
  rating: 5,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)

Review.create!(
  title: "Not as advertised",
  description: "This house was not as advertised. The pictures made it look much nicer than it actually was. The location was also not great, as it was far from everything. We would not stay here again.",
  rating: 2,
  author_id: user_ids.sample,
  listing_id: Listing.all.sample.id
)
