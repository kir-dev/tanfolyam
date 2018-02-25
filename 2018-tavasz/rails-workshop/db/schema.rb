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

ActiveRecord::Schema.define(version: 20180225212651) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "flavors", id: :integer, default: -> { "nextval('job_id_seq'::regclass)" }, force: :cascade do |t|
    t.string "name", limit: 255
    t.string "brand", limit: 255
  end

  create_table "items", id: :integer, default: -> { "nextval('items_id_sequence'::regclass)" }, force: :cascade do |t|
    t.string "name", limit: 255
    t.integer "quantity"
    t.integer "room"
    t.string "product", limit: 255
    t.integer "flavor"
    t.string "price", limit: 255
  end

  create_table "spatial_ref_sys", primary_key: "srid", id: :integer, default: nil, force: :cascade do |t|
    t.string "auth_name", limit: 256
    t.integer "auth_srid"
    t.string "srtext", limit: 2048
    t.string "proj4text", limit: 2048
  end

end
