json.user do
  json.extract! @user, :id, :email, :username, :created_at, :updated_at
  json.favorited_listings @user.favorites 


end