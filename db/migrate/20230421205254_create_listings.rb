class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :address, null: false 
      t.string :city, null: false 
      t.string :state, null: false 
      t.string :zip_code, null: false 
      t.decimal :price, null: false 
      t.references :poster, null: false, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
