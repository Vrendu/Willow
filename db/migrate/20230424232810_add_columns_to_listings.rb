class AddColumnsToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :bedrooms, :integer, null: false 
    add_column :listings, :bathrooms, :integer, null: false 
  end
end
