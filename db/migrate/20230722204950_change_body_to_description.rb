class ChangeBodyToDescription < ActiveRecord::Migration[7.0]
  def change
    rename_column :reviews, :body, :description
  end
end
