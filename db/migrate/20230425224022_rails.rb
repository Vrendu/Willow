class Rails < ActiveRecord::Migration[7.0]
  def change
    remove_column :listings, :image_url, :string
  end
end
