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

ActiveRecord::Schema.define(version: 20151231094614) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authorizations", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.integer  "user_id"
    t.string   "token"
    t.string   "secret"
    t.string   "name"
    t.string   "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.text     "content",          null: false
    t.integer  "author_id",        null: false
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree
  add_index "comments", ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id", using: :btree

  create_table "memberships", force: :cascade do |t|
    t.integer  "project_id", null: false
    t.integer  "member_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "memberships", ["member_id"], name: "index_memberships_on_member_id", using: :btree
  add_index "memberships", ["project_id"], name: "index_memberships_on_project_id", using: :btree

  create_table "notifications", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "record_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "notifications", ["record_id"], name: "index_notifications_on_record_id", using: :btree
  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id", using: :btree

  create_table "organizations", force: :cascade do |t|
    t.integer  "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "title",                       null: false
    t.integer  "author_id",                   null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.text     "description"
    t.boolean  "archived",    default: false
  end

  create_table "records", force: :cascade do |t|
    t.integer  "recordable_id"
    t.string   "recordable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name",            null: false
    t.integer  "user_id",         null: false
  end

  add_index "records", ["recordable_type", "recordable_id"], name: "index_records_on_recordable_type_and_recordable_id", using: :btree
  add_index "records", ["user_id"], name: "index_records_on_user_id", using: :btree

  create_table "step_assignments", force: :cascade do |t|
    t.integer  "step_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "assignee_id", null: false
  end

  add_index "step_assignments", ["assignee_id"], name: "index_step_assignments_on_assignee_id", using: :btree
  add_index "step_assignments", ["step_id"], name: "index_step_assignments_on_step_id", using: :btree

  create_table "steps", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "body"
    t.integer  "author_id",  null: false
    t.boolean  "done",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "due_at"
    t.datetime "start_at"
    t.integer  "todo_id",    null: false
  end

  add_index "steps", ["author_id"], name: "index_steps_on_author_id", using: :btree
  add_index "steps", ["todo_id"], name: "index_steps_on_todo_id", using: :btree

  create_table "team_memberships", force: :cascade do |t|
    t.integer  "team_id",    null: false
    t.integer  "member_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "team_memberships", ["member_id"], name: "index_team_memberships_on_member_id", using: :btree
  add_index "team_memberships", ["team_id"], name: "index_team_memberships_on_team_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "project_id", null: false
  end

  add_index "teams", ["project_id"], name: "index_teams_on_project_id", using: :btree

  create_table "todos", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "body"
    t.boolean  "done",       null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "project_id", null: false
  end

  add_index "todos", ["project_id"], name: "index_todos_on_project_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "password_digest",     null: false
    t.string   "session_token",       null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "name"
    t.string   "title"
    t.integer  "organization_id"
    t.string   "email",               null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
