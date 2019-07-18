class CreateBands < ActiveRecord::Migration[5.2]
  def change
    create_table :bands do |t|
      t.string :name
      t.string :username
      t.string :password
      t.string :email
      t.string :image_url
      t.string :genres
      t.string :instruments
      t.string :spotify
      t.string :soundcloud
      t.string :instragram
      t.string :facebook
      t.boolean :band => true

      t.timestamps
    end
  end
end

