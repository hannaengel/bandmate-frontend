class AddUsernameToBands < ActiveRecord::Migration[5.2]
  def change
    add_column :bands, :username, :string
  end
end
