class AddColumnToBand < ActiveRecord::Migration[5.2]
  def change
    add_column :bands, :bio, :string
  end
end
