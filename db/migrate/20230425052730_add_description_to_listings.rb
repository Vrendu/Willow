class AddDescriptionToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :description, :text, null: false
  end
end
