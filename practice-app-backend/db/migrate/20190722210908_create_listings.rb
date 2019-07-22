class CreateListings < ActiveRecord::Migration[5.2]
  def change
    create_table :listings do |t|
      t.string :title
      t.string :description
      t.string :instruments
      t.integer :band_id

      t.timestamps
    end
  end
end
