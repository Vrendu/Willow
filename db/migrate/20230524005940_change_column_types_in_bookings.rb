class ChangeColumnTypesInBookings < ActiveRecord::Migration[7.0]
  def change
     change_column :bookings, :listing_id, :integer, null: false
    change_column :bookings, :user_id, :integer, null: false
    change_column :bookings, :participants, :integer
  end
end
