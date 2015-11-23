# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151123163631) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "organizations", force: :cascade do |t|
    t.integer  "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description", null: false
    t.integer  "author_id",   null: false
    t.boolean  "archived",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "step_assignments", force: :cascade do |t|
    t.integer  "step_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "assignee_id", null: false
    t.integer  "assigner_id", null: false
  end

  add_index "step_assignments", ["assignee_id"], name: "index_step_assignments_on_assignee_id", using: :btree
  add_index "step_assignments", ["assigner_id"], name: "index_step_assignments_on_assigner_id", using: :btree
  add_index "step_assignments", ["step_id"], name: "index_step_assignments_on_step_id", using: :btree

  create_table "steps", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "body"
    t.integer  "todo_id"
    t.integer  "author_id",  null: false
    t.boolean  "done",       null: false
    t.datetime "due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "steps", ["author_id"], name: "index_steps_on_author_id", using: :btree
  add_index "steps", ["todo_id"], name: "index_steps_on_todo_id", using: :btree

  create_table "team_memberships", force: :cascade do |t|
    t.integer  "team_id",    null: false
    t.integer  "member_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.integer  "prject_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "todos", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "body"
    t.boolean  "done",       null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "password_digest",     null: false
    t.string   "session_token",       null: false
    t.string   "email",               null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "name"
    t.string   "title"
    t.integer  "organization_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
