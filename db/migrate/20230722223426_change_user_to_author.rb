class ChangeUserToAuthor < ActiveRecord::Migration[7.0]
  def change
    rename_column :reviews, :user_id, :author_id
  end
end
