class AddBandToBands < ActiveRecord::Migration[5.2]
  def change
    add_column :bands, :band, :boolean, default: true 
  end
end
