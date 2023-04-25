class AddSquareFeetToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :square_feet, :integer
  end
end
