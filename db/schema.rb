# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_25_224022) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "listing_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_favorites_on_listing_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "listings", force: :cascade do |t|
    t.string "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip_code", null: false
    t.decimal "price", null: false
    t.bigint "poster_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "bedrooms", null: false
    t.integer "bathrooms", null: false
    t.string "title", null: false
    t.text "description", null: false
    t.integer "square_feet"
    t.index ["poster_id"], name: "index_listings_on_poster_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "session_token"
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["password_digest"], name: "index_users_on_password_digest", unique: true
  end

  add_foreign_key "favorites", "listings"
  add_foreign_key "favorites", "users"
  add_foreign_key "listings", "users", column: "poster_id"
end
