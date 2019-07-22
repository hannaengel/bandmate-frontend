class CreateMusicians < ActiveRecord::Migration[5.2]
  def change
    create_table :musicians do |t|
      t.string :name
      t.string :username
      t.string :password
      t.string :email
      t.string :image_url
      t.string :bio
      t.string :soundcloud
      t.string :spotify
      t.string :instruments
      t.string :genres
      t.string :facebook
      t.string :instagram
      t.timestamps
    end
  end
end
