class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.string :title, null: false
      t.text :body
      t.integer :rating, null: false
      t.references :user, null: false, foreign_key: true
      t.references :listing, null: false, foreign_key: true
      t.timestamps
    end
  end
end
