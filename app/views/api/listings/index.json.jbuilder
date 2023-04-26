json.array! @listings do |listing|
  json.extract! listing, :id, :title, :description, :price
  json.photoUrls @listing.photos.map { |file| url_for(file) }

end