class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
       t.references :listing, null: false
      t.references :user, null: false
      t.date :date
      t.time :time
      t.integer :participants
      t.timestamps
    end
  end
end
