# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_29_161906) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bands", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "image_url"
    t.string "genres"
    t.string "instruments"
    t.string "spotify"
    t.string "soundcloud"
    t.string "instagram"
    t.string "facebook"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "band", default: true
    t.string "username"
    t.string "password_digest"
    t.string "bio"
  end

  create_table "listings", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "instruments"
    t.integer "band_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "musicians", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "image_url"
    t.string "bio"
    t.string "soundcloud"
    t.string "spotify"
    t.string "instruments"
    t.string "genres"
    t.string "facebook"
    t.string "instagram"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
