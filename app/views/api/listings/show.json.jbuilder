json.listing do
  json.extract! @listing, :id, :address, :city, :state, :zip_code
    :price, :poster_id, "bedrooms, :bathrooms, :title, :description
    :square_feet, :created_at, :updated_at
end