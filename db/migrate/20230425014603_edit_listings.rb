class EditListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :title, :string, null: false  
  end
end
